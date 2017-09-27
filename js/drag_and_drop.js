//Exercise: Drag and Drop countries

function List(options){
  this.bothListsJson = options;
}

List.prototype.init = function(){
  this.makeListItemsDraggableAndDroppable();
};

List.prototype.makeListItemsDraggableAndDroppable = function(){
  var _this = this;

  for(list in this.bothListsJson){
    this.bothListsJson[list].find('li').draggable({ revert : 'invalid',
                                                    cursor : 'move',
                                                    helper : 'clone',
                                                    containment : '.container'
                                                  });

    this.bothListsJson[list].droppable({ tolerance : 'pointer',
                                         drop : function(event, ui){
                                           _this.appendCountry(ui.draggable, $(this));
                                         }
                                       });
  }
};

List.prototype.appendCountry = function($country, $list){
  $country.appendTo($list);
};

$(document).ready(function(){
  var countriesList = new List({ '$mainList' : $('.main-list'),
                                 '$selectedList' : $('.selected-list')
                               });
  countriesList.init();
});