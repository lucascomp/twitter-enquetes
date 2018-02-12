class Runnable {

    constructor() {
        this.initialized = false;
    }

    start(fn){
        let r = null;
        if(this.onInit) {
            if(!this.initialized) {
                r = this.onInit();
                this.initialized = true;
            }
        }
        if(r && r instanceof Promise) {
            r.then(() => this.onStart(fn));
        }
        else {
            this.onStart(fn);
        }
    }
  
    stop(fn){
        this.onStop(fn);
    }
}
  
module.exports = Runnable;