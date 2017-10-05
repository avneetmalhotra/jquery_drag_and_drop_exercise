//Exercise: Drag and Drop countries
function List(options){
  this.$mainList = options.$mainList;
  this.$mainListItems = this.$mainList.find('li');
  this.$selectedList = options.$selectedList;
  this.$selectedListItems = this.$selectedList.find('li');
}

List.prototype.init = function(){
  this.bindDragEvent(this.$mainListItems);
  this.bindDragEvent(this.$selectedListItems);

  this.bindDropEvent(this.$mainList);
  this.bindDropEvent(this.$selectedList);
};

List.prototype.bindDragEvent = function($listItems){
  $listItems.draggable({
    revert : 'invalid',
    cursor : 'move',
    helper : 'clone',
    containment : '.container'
  });
};

List.prototype.bindDropEvent = function($list){
  var _this = this;

  $list.droppable({ 
    tolerance : 'pointer',
    drop : _this.dropEventHandler
  });
};

List.prototype.dropEventHandler = function(event, ui){
  var $countryDragged = ui.draggable,
      $listToCatchDroppedCountry = $(this);

  $countryDragged.appendTo($listToCatchDroppedCountry);
};

$(document).ready(function(){
  var countriesList = new List({ 
    '$mainList' : $('.main-list'),
    '$selectedList' : $('.selected-list')
  });
  countriesList.init();
});
