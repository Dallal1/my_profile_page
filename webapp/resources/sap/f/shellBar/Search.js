/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/f/shellBar/SearchRenderer","sap/m/SearchField","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarLayoutData","sap/m/Button","sap/ui/events/KeyCodes","./Accessibility","sap/m/library"],function(e,t,s,r,o,a,i,n,l){"use strict";var h=l.ButtonType;var u=l.OverflowToolbarPriority;var p=e.extend("sap.f.shellBar.Search",{metadata:{interfaces:["sap.m.IOverflowToolbarContent"],library:"sap.f",properties:{isOpen:{type:"boolean",defaultValue:false},phoneMode:{type:"boolean",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null}},aggregations:{_searchField:{type:"sap.m.SearchField",multiple:false},_searchButton:{type:"sap.m.OverflowToolbarButton",multiple:false},_cancelButton:{type:"sap.m.Button",multiple:false}},events:{search:{parameters:{query:{type:"string"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}},renderer:t});p.prototype.init=function(){this._sOldValue="";this._shouldFocusSearch=false;this._layoutDataWhenOpen=new o({priority:u.NeverOverflow});this._layoutDataWhenClosed=new o({priority:u.Low});this._layoutDataPhoneWhenClosed=new o({priority:u.AlwaysOverflow});this._oAcc=new n;this._bUserOpened=false};p.prototype.onBeforeRendering=function(){this._switchOpenStateOnSearch()};p.prototype.onAfterRendering=function(){setTimeout(function(){if(this._shouldFocusSearch){this._getSearchField().getFocusDomRef().focus();this._shouldFocusSearch=false}}.bind(this),0)};p.prototype.exit=function(){if(this._layoutDataWhenOpen){this._layoutDataWhenOpen.destroy()}if(this._layoutDataWhenClosed){this._layoutDataWhenClosed.destroy()}};p.prototype._getSearchField=function(){var e=this.getAggregation("_searchField");if(!e){e=new s({showSearchButton:false,search:this._onSearch.bind(this),liveChange:this._onLiveChange.bind(this),suggest:this._onSuggest.bind(this)});this.setAggregation("_searchField",e)}return e};p.prototype._getSearchButton=function(){var e=this.getAggregation("_searchButton");if(!e){e=new r({text:"Search",icon:"sap-icon://search",type:h.Transparent,press:this._onPressSearchButtonHandler.bind(this),tooltip:this._oAcc.getEntityTooltip("SEARCH")});this.setAggregation("_searchButton",e)}return e};p.prototype._getCancelButton=function(){var e=this.getAggregation("_cancelButton");if(!e){e=new a({text:"Cancel",type:h.Transparent,press:this._onPressCancelButtonHandler.bind(this)});e.addStyleClass("sapFShellBarSearchCancelButton");this.setAggregation("_cancelButton",e)}return e};p.prototype.toggleVisibilityOfSearchField=function(){var e=this.getIsOpen();this.setIsOpen(!e);this._shouldFocusSearch=!e;this.fireEvent("_updateVisualState",{isOpen:!e})};p.prototype._switchOpenStateOnSearch=function(){var e;if(this.getIsOpen()){e=this._layoutDataWhenOpen}else if(!this._bInOverflow&&!this.getPhoneMode()){e=this._layoutDataWhenClosed}else if(this.getPhoneMode()){e=this._layoutDataPhoneWhenClosed}if(!e||this.getLayoutData()===e){return}this.toggleStyleClass("sapFShellBarSearchOpenTick",this.getIsOpen());this.setLayoutData(e)};p.prototype._onPressSearchButtonHandler=function(){var e=this._getSearchField();if(e.getValue()&&this.getIsOpen()){this.fireSearch({query:e.getValue(),clearButtonPressed:false})}if(this.sCurrentRange==="ExtraLargeDesktop"){return}this.toggleVisibilityOfSearchField();this._bUserOpened=!this._bUserOpened};p.prototype._setMedia=function(e){this.sCurrentRange=e};p.prototype._onPressCancelButtonHandler=function(){this._bUserOpened=false;this.toggleVisibilityOfSearchField()};p.prototype._onSearch=function(e){var t=e.getParameters();t.id=this.getId();if(e.getParameter("clearButtonPressed")){this._shouldCloseOnNextEscape=false}this.fireSearch(t)};p.prototype._onLiveChange=function(e){var t=e.getParameters();delete t.refreshButtonPressed;delete t.suggestionItem;t.id=this.getId();this._shouldCloseOnNextEscape=!t.newValue;this.fireLiveChange(t)};p.prototype._onSuggest=function(e){var t=e.getParameters();t.id=this.getId();this.fireSuggest(t)};p.prototype.onkeyup=function(e){var t=this._getSearchField();if(e.keyCode===i.ESCAPE){if(t._oSuggest&&t._oSuggest.isOpen()){return}if(this._shouldCloseOnNextEscape){this._shouldCloseOnNextEscape=false;return}this.toggleVisibilityOfSearchField()}};p.prototype._onBeforeEnterOverflow=function(){var e=this._getSearchButton();this._bInOverflow=true;e._bInOverflow=true;e.addStyleClass("sapFShellBarSearchOverflowToolbar");this._switchOpenStateOnSearch()};p.prototype._onAfterExitOverflow=function(){var e=this._getSearchButton();this._bInOverflow=false;e._bInOverflow=false;e.removeStyleClass("sapFShellBarSearchOverflowToolbar")};p.prototype.getOverflowToolbarConfig=function(){var e={canOverflow:true};e.onBeforeEnterOverflow=this._onBeforeEnterOverflow.bind(this);e.onAfterExitOverflow=this._onAfterExitOverflow.bind(this);return e};return p});
//# sourceMappingURL=Search.js.map