import Avatar from 'images/avatar.png';
import Typed from 'typed.js';

export default class Main extends React.Component {
  componentDidMount() {
    let options = {
      strings: ["A Truly Creative Maker","Front-End Developer","Tel:15026444506"],
      typeSpeed: 50,
      contentType: 'html',
      loop: true,
      backDelay: 1000
    }
    let typed = new Typed(".typed-quotes", options);
  }
  render() {
    const page = () => (
      <section>
      <style jsx>{`
        .avatar {
            background-image: url(${Avatar});
            cursor:pointer;
            transition: transform 2s ease-out;
        }
        .avatar:hover {
            transform: rotateZ(360deg);
        }
        .subscribe {
            font-family: ProximaNova-Light;
            font-size: 16px;
            color: #999;
        }
        .typed-quotes {
          letter-spacing: 2px;
          font-size:14px;
          line-height:22px;
        }
        .typed-cursor {
          opacity: 1;
          -webkit-animation: blink 0.7s infinite;
          -moz-animation: blink 0.7s infinite;
          animation: blink 0.7s infinite;
        } 
        .summary.zh {
          font-family: DroidSansFallback;
        }
        .describe {
          margin-top:4px;
          text-align:center;
        }
        .describe p {
          margin-top:0;
          margin-bottom:2px;
        }
      `}</style>
      <div className="section-header">
        <div>
          <div className="avatar round-logo" id="mainTarget"></div>
          <div className="summary zh">
            邹易行
          {/* Creative Maker */}
          </div>
          <div className="describe">
            <span className="subscribe">
              /* <span className="typed-quotes"></span> */
             
            </span>
            <p className="subscribe">Aircity@drrr.us</p>
          </div>
        </div>
      </div>
      <div className="section-footer">
        <div id="allItems-object">
            <div className="items-object">
              <span className="icon"><i className="icon-icon-less-n"></i></span>
              <h3>Long live the Desktop</h3>
              <span className="zh">桌面为王</span>
            </div>
            <div className="items-object" data-attr="link" data-link="http://jiaxiao.plat.ebjcloud.com">
              <span className="icon"><i className="icon-icon-app-n"></i></span>
              <h3>Cute Phone</h3>
              <span className="zh">移动优先</span>
            </div>
            <div className="items-object">
              <span className="icon"><i className="icon-icon-technologies-n"></i></span>
              <h3>The Human Script</h3>
              <span className="zh">以人为本</span>
            </div>
        </div>
      </div>     
  </section>
    )
    return page();
  }
}
