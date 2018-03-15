
import path from 'path'

const config = new Map();

config.set('host','localhost')
config.set('port', 3600)

config.set('host_port',
  `http://${config.get('host')}:${config.get('port')}`
);

config.set('titleTag',"TableData DevTool")

config.set('setProxy',false)

config.set('proxy',{
	"/api": {
    target: "http://localhost:3000",
    pathRewrite: {"^/api" : ""},
    secure: false
  }
})

config.set('vendor_dependencies', [
  'react'
]);

config.set('build_dependencies',[
  'babel-polyfill'
]);
//classlist-polyfill

config.set('product_dependencies', config.get('vendor_dependencies').concat(config.get('build_dependencies')))

config.set('assetsRoot', "dist");
config.set('assetsPublic', '/assets/');
config.set('assetsRootPath', path.resolve(__dirname, "../", config.get("assetsRoot")));

config.set('isBuild', process.env.NODE_ENV !== 'development')

export default config
