//app.js
import manager from './tools/colloct_mangager.js'
App({
  onLaunch(){
    manager.initManager();
  }
})