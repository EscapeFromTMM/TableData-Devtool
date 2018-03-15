import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import "stylesheets/app.css";
import "material-design-icons/iconfont/material-icons.css"

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import TodoItem from "./todoItem";
import update from "immutability-helper";

import FileSaver from 'file-saver'
import beautify from 'beautify'

let dataSource = [
  {
    title: "来源单Code",
    data: "sourceCode"
  },
  {
    title: "来源单类型",
    data: "sourceType"
  },
  {
    title: "目标仓库名称",
    data: "targetWarehouseName"
  },
  {
    title: "供应商名称",
    data: "supplierName"
  },
  {
    title: "记账主体编号",
    data: "accountingSubjectCode"
  },
  {
    title: "记账主体名称",
    data: "accountingSubjectName"
  },
  {
    title: "采购库存",
    data: "procurementInventory"
  },
  {
    title: "采购在途库存",
    data: "procurementOnorderInventory"
  },
  {
    title: "预约入库库存",
    data: "resevationStockinInventory"
  },
  {
    title: "采购入库库存",
    data: "procurementStockinInventory"
  },
  {
    title: "操作人",
    data: "operationBy"
  },
  {
    title: "创建时间",
    data: "procurementCreateTime"
  },
  {
    title: "完成时间",
    data: "finishTime"
  },
  {
    title: "目标仓库Id",
    data: "targetWarehouseId"
  },
  {
    title: "货品Id",
    data: "goodsId"
  },
  {
    title: "供应商Id",
    data: "supplierId"
  },
  {
    title: "单号Code",
    data: "billCode"
  },
  {
    title: "单据类型",
    data: "billType"
  },
  {
    title: "仓储商名称",
    data: "warehousingDealerName"
  },
  {
    title: "货品Code",
    data: "goodsCode"
  },
  {
    title: "货品名称",
    data: "goodsName"
  },
  {
    title: "最小使用单位",
    data: "smallestSellUnitName"
  },
  {
    title: "组成数量",
    data: "packageNumber"
  },
  {
    title: "库存单位（采购单位）",
    data: "stockUnitName"
  },
  {
    title: "箱包装数量",
    data: "boxPackageAmount"
  },
  {
    title: "箱包装单位（收货单位）",
    data: "boxPackageUnit"
  },
  {
    title: "温层",
    data: "temperatureLayerName"
  },
  {
    title: "单据来源Id，SRM系统中单据主键",
    data: "originId"
  }
];

@DragDropContext(HTML5Backend)
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.dropItem = this.dropItem.bind(this);
    this.handleEndDrag = this.handleEndDrag.bind(this);
    this.state = {
      tableData: dataSource
    };
  }
  moveItem(dragIndex, hoverIndex) {
    Array.from(this.refs.dragList.children).forEach((element, index) => {
      if (index == hoverIndex) {
        element.classList.add("drag-line");
      } else {
        element.classList.remove("drag-line");
      }
    });
  }
  dropItem(dragIndex, dropIndex) {
    const { tableData } = this.state;
    const dragCard = tableData[dragIndex];
    this.setState(
      update(this.state, {
        tableData: {
          $splice: [[dragIndex, 1], [dropIndex, 0, dragCard]]
        }
      })
    );
  }
  handleEndDrag() {
    Array.from(this.refs.dragList.children).forEach((element, index) => {
      element.classList.remove("drag-line");
    });
  }
  render() {
    const { tableData } = this.state;
    return (
      <ul className="todo-list" ref="dragList">
        {tableData.map((item, index) => {
          let title = item.title;
          let data = item.data;
          return (
            <TodoItem
              key={index}
              index={index}
              title={title}
              data={data}
              moveItem={this.moveItem}
              dropItem={this.dropItem}
              handleEndDrag={this.handleEndDrag}
            />
          );
        })}
      </ul>
    );
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.catchData = this.catchData.bind(this);    
  }
  catchData() {
   const todoList = this.refs.todoList.child;
   const tableData = todoList.state.tableData;

   const json = beautify(JSON.stringify(tableData), {format: 'json'});
   const blob = new Blob([json], {type: "application/json"});

   FileSaver.saveAs(blob, "app.config.json");    
  }  
  render() {
    return (
      <React.Fragment>
        <section className="todoapp">
          <div>
            <header className="header">
              <h1>table data <i className="material-icons" onClick={this.catchData}>cloud_download</i> </h1>
            </header>
            <section className="main">
              <input className="toggle-all" type="checkbox" />
              <TodoList ref="todoList"/>
            </section>
          </div>
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            ❤ Created by <a href="http://github.com/aircity/">aircity</a>
          </p>
        </footer>
      </React.Fragment>
    );
  }
}
