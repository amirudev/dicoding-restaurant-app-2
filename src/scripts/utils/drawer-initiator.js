const DrawerInitiator = {
    init({ button, drawer, content }){
        button.addEventListener('click', event => {
            this._toggleDrawer(event, drawer);
        });

        content.addEventListener('click', event => {
            this._closeDrawer(event, drawer);
        });
    },

    _toggleDrawer(){

    },

    _closeDrawer(){
        
    }
}