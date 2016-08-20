/// <reference path="../src/prest/prest-widgets.ts" />

window.onload = () => {

    class Item {
        constructor(public text:string, public count:number) {
        }
    }

    class MyWidget implements prest.widgets.Widget {

        private _element:HTMLElement;
        private _items:Item[] = [];
        private _onSelect:(item)=>void;

        constructor(items:Item[]) {
            this._items = items;
        }

        onSelect(callback:(item:Item)=>void) {
            this._onSelect = callback;
        }

        addItem(item:Item) {
            item.text += this._items.length + 1;
            item.count = this._items.length + 1;
            this._items.push(item);
            this._renderItems();
        }

        element():HTMLElement {
            if (!this._element) {
                var e = prest.widgets.element(`<ol class="widget"></ol>`);
                this._element = e;
                this._renderItems();
            }
            return this._element;
        }

        private _renderItems():void {
            if (this._element) {
                this._element.innerHTML = '';
                this._items.map((item) => {
                    var e = prest.widgets.element(`
                        <li>
                            <span class="label" >${item.text}</span>
                            <small class="count">[${item.count}]</small>
                        </li>`);
                    var self = this;
                    e.onclick = function (event) {
                        event.stopPropagation();
                        self._onSelect(item);
                    };
                    this._element.appendChild(e);
                });
            }
        }

    }

    var myWidget = new MyWidget(
        [
            new Item('text 1', 1),
            new Item('text 2', 2),
            new Item('text 3', 3)
        ]
    );

    myWidget.onSelect((item) => {
        console.log('selected:', item);
        var selected = document.getElementById('selected') as HTMLSpanElement;
        selected.innerHTML = JSON.stringify(item);
        myWidget.addItem(new Item('text ', 0));
    });

    var myWidgetElement = myWidget.element();

    var container = document.getElementById('container') as HTMLDivElement;
    container.appendChild(myWidgetElement);
};
