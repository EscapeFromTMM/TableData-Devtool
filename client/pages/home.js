import 'stylesheets/style.css';
import homeCss from './home.css';

// view
const pages = () => (
  <div className="fullpage" id="fullpage">
    <style jsx>
      {`${homeCss}`}
    </style>
    ❤ jumper
  </div>
)

// react-component
export default class Home extends React.Component {
  constructor(props) {
     super(props);
     this.Animate = null;
   }
  scrollTop(target) {
    let App = document.querySelector("html")
    this.Animate(App, 'scroll', {
        duration: 600,
        offset: target.offsetTop
    });
  }
  // async componentDidMount() {
  //   let self = this;
  //   import('stylesheets/font.css');
  //   this.Animate = await import('velocity-animate');
  //   setTimeout(()=>{
  //     window.scroll(0,0);
  //   },0);
  // }
  render() {
    <style jsx>
    </style>
    return pages();
  }
}
