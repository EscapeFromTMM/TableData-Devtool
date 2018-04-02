import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import classNames from "classnames";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag(props) {
    props.handleEndDrag();
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);
  },
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    props.dropItem(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@DropTarget("item", cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource("item", cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))


export default class Item extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      editText: this.props.title
    }
  }
  handleSubmit() {
    console.log('handlesubmit');
    var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDelete();
			}
  }
  handleEdit() {
    console.log(this.props.editing);
    this.props.onEdit();
    this.setState({
      editText: this.props.title
    })
  }
  handleKeyDown(event) {
    console.log(event.which);
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }
  handleChange(event) {
    console.log('handleChange');
		console.log(event);
    this.setState({editText: event.target.value});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.title !== this.props.title ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }
  render() {
    const {
      title,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    return connectDragSource(
      connectDropTarget(
        <li className={classNames({
					editing: this.props.editing
				})}>
          <div className="view">
            <input className="toggle" type="checkbox"
            />
            <label onDoubleClick = {this.handleEdit}>              
              <span className="label-left" >{this.props.title || "Here to catch"} </span>
              <span className="label-right">{this.props.data}</span>
            </label>
            <button className="destroy" onClick = {this.props.onDelete}/>
          </div>
          <input ref="editField" className="edit" 
            value={this.state.editText}
            onBlur={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
          />
        </li>
      )
    );
  }
}
