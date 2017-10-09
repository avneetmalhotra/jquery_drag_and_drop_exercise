//Exercise: Drag and Drop countries
function List(options){
  this.$mainList = options.$mainList;
  this.$mainListItems = this.$mainList.find('li');
  this.$selectedList = options.$selectedList;
  this.$selectedListItems = this.$selectedList.find('li');
  this.containerDiv = this.$mainList.parent()[0];
  console.log(this.containerDiv);
}

List.prototype.init = function(){
  this.bindDragEvent(this.$mainListItems);
  this.bindDragEvent(this.$selectedListItems);

  this.bindDropEvent(this.$mainList, this.$selectedList);
  this.bindDropEvent(this.$selectedList, this.$mainList);
};

List.prototype.bindDragEvent = function($listItems){
  $listItems.draggable({
    revert : 'invalid',
    cursor : 'move',
    helper : 'clone',
    containment : this.containerDiv
  });
};

List.prototype.bindDropEvent = function($fromList, $toList){
  var _this = this;

  $toList.droppable({ 
    tolerance : 'pointer',
    drop : _this.dropEventHandler,
    accept : function(element){
      console.log(element.is($fromList.find('li')));
      return element.is($fromList.find('li'));
    }
  });
};

List.prototype.dropEventHandler = function(event, ui){
  var $countryDragged = ui.draggable,
      $listToCatchDroppedCountry = $(this);

  $countryDragged.appendTo($listToCatchDroppedCountry);
};

$(document).ready(function(){
  var sportsList = new List({ 
    '$mainList' : $('.sports-list'),
    '$selectedList' : $('.liked-sports-list')
  });
  sportsList.init();

  var countriesList = new List({ 
    '$mainList' : $('.country-list'),
    '$selectedList' : $('.selected-country-list')
  });
  countriesList.init();
});
