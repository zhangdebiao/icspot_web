'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Global = exports.registerShape = exports.registerAnimation = undefined;

var _viser = require('viser');

var viser = _interopRequireWildcard(_viser);

var _typed = require('./typed');

var _typed2 = _interopRequireDefault(_typed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};

var regSeries = ['pie', 'sector', 'line', 'smoothline', 'dashline', 'area', 'point', 'stackarea', 'smootharea', 'bar', 'stackbar', 'dodgebar', 'interval', 'stackinterval', 'dodgeinterval', 'funnel', 'pyramid', 'schema', 'box', 'candle', 'polygon', 'contour', 'heatmap', 'edge', 'sankey', 'errorbar', 'jitterpoint', 'path'];
var rootCharts = ['v-chart', 'v-lite-chart'];
var rootPlugin = ['v-plugin'];
var rootChartProps = ['data', 'scale', 'viewId'];
var seriesProps = ['position', 'quickType', 'gemo', 'adjust', 'color', 'shape', 'size', 'opacity', 'label', 'tooltip', 'style', 'animate'];
var camelCase = function () {
    var DEFAULT_REGEX = /[-_]+(.)?/g;
    function toUpper(match, group1) {
        return group1 ? group1.toUpperCase() : '';
    }
    return function (str, delimiters) {
        return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
    };
}();
var baseChartComponent = {
    data: function data() {
        return {
            isViser: true,
            jsonForD2: {}
        };
    },
    props: _typed2.default,
    methods: {
        checkIsContainer: function checkIsContainer(componentInstance) {
            if (componentInstance.isViser && rootCharts.concat(['v-view', 'v-facet', 'v-facet-view', 'v-plugin']).indexOf(componentInstance.$options._componentTag) > -1) {
                return true;
            } else {
                return false;
            }
        },
        findNearestRootComponent: function findNearestRootComponent(componentInstance) {
            if (this.checkIsContainer(componentInstance)) {
                if (componentInstance.$options._componentTag === 'v-lite-chart') {
                    throw Error('v-lite-chart should be no child elements.');
                }
                return componentInstance;
            }
            if (componentInstance.$parent) {
                return this.findNearestRootComponent(componentInstance.$parent);
            }
            return null;
        },
        createRootD2Json: function createRootD2Json() {
            if (this.$options._componentTag === 'v-plugin') {
                return __assign({}, cleanUndefined(normalizeProps(this._props, rootChartProps)), this.jsonForD2);
            }
            var d2Json = __assign({}, cleanUndefined(normalizeProps(this._props, rootChartProps)), { chart: __assign({ container: this.$el }, cleanUndefined(normalizeProps(this._props, null, rootChartProps))) }, this.jsonForD2);
            if (this.$options._componentTag === 'v-lite-chart') {
                var existProps_1 = cleanUndefined(this._props);
                Object.keys(existProps_1).forEach(function (propsKey) {
                    var lowerCasePropsKey = propsKey.toLowerCase();
                    if (regSeries.indexOf(lowerCasePropsKey) > -1) {
                        safePush(d2Json, 'series', __assign({ quickType: propsKey }, normalizeProps(existProps_1, seriesProps)));
                    }
                });
                setIfNotExist(d2Json, 'axis', true);
                setIfNotExist(d2Json, 'legend', true);
                setIfNotExist(d2Json, 'tooltip', true);
            }
            return d2Json;
        },
        freshChart: function freshChart(isUpdate) {
            if (rootPlugin.indexOf(this.$options._componentTag) > -1) {
                var d2Json = this.createRootD2Json();
                if (!isUpdate) {
                    this.plugins = viser.Plugin(d2Json);
                }
            } else if (rootCharts.indexOf(this.$options._componentTag) > -1) {
                var d2Json = this.createRootD2Json();
                if (!isUpdate || !this.chart) {
                    this.chart = viser["default"](d2Json);
                } else {
                    this.chart.repaint(d2Json);
                }
            } else if (this.$options._componentTag === 'v-view') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                oneObjectMoreArray(nearestRootComponent.jsonForD2, 'views', __assign({}, cleanUndefined(normalizeProps(this._props)), this.jsonForD2, { viewId: this._uid }));
            } else if (this.$options._componentTag === 'v-facet-view') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                nearestRootComponent.jsonForD2.views = __assign({}, cleanUndefined(normalizeProps(this._props)), this.jsonForD2);
            } else if (this.$options._componentTag === 'v-facet') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                nearestRootComponent.jsonForD2.facet = __assign({}, cleanUndefined(normalizeProps(this._props)), this.jsonForD2);
            } else if (this.$options._componentTag === 'v-slider') {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                var sliderOpts = cleanUndefined(normalizeProps(this._props));
                if (!cleanUndefined(normalizeProps(this._props)).container) {
                    sliderOpts.container = 'viser-slider-' + generateRandomNum();
                }
                var sliderContainer = document.createElement('div');
                sliderContainer.id = sliderOpts.container;
                this.$parent.$el.appendChild(sliderContainer);
                nearestRootComponent.jsonForD2.slider = __assign({}, sliderOpts, this.jsonForD2);
            } else {
                var nearestRootComponent = this.findNearestRootComponent(this.$parent);
                if (!nearestRootComponent) {
                    throw Error(this.$options._componentTag + " must be wrapped into v-chart or v-plugin");
                }
                var rechartName = this.$options._componentTag.replace(/-/g, '').slice(1);
                var rechartNameCamelCase = camelCase(this.$options._componentTag.slice(2));
                if (isAllUndefined(this._props)) {
                    nearestRootComponent.jsonForD2[rechartName] = true;
                } else if (regSeries.indexOf(rechartName) > -1) {
                    safePush(nearestRootComponent.jsonForD2, 'series', __assign({ quickType: rechartNameCamelCase }, cleanUndefined(normalizeProps(this._props))));
                } else {
                    oneObjectMoreArray(nearestRootComponent.jsonForD2, rechartName, __assign({}, cleanUndefined(normalizeProps(this._props)), { componentId: this._uid }));
                }
            }
        }
    },
    created: function created() {},
    mounted: function mounted() {
        this.freshChart(false);
    },
    updated: function updated() {
        this.freshChart(true);
    },
    render: function render(createElement) {
        var isContainer = this.checkIsContainer(this);
        if (isContainer) {
            return createElement('div', null, this.$slots["default"]);
        }
        var props = cleanUndefined(normalizeProps(this._props));
        return createElement('div', { style: { display: 'none' } }, Object.keys(props).map(function (key) {
            return '' + key + ':' + JSON.stringify(props[key]);
        }));
    }
};
exports.default = {
    install: function install(Vue, options) {
        Vue.component('v-chart', baseChartComponent);
        Vue.component('v-tooltip', baseChartComponent);
        Vue.component('v-legend', baseChartComponent);
        Vue.component('v-axis', baseChartComponent);
        Vue.component('v-brush', baseChartComponent);
        Vue.component('v-view', baseChartComponent);
        Vue.component('v-coord', baseChartComponent);
        Vue.component('v-series', baseChartComponent);
        Vue.component('v-facet', baseChartComponent);
        Vue.component('v-facet-view', baseChartComponent);
        Vue.component('v-lite-chart', baseChartComponent);
        Vue.component('v-guide', baseChartComponent);
        Vue.component('v-edge', baseChartComponent);
        Vue.component('v-point', baseChartComponent);
        Vue.component('v-pie', baseChartComponent);
        Vue.component('v-bar', baseChartComponent);
        Vue.component('v-stack-bar', baseChartComponent);
        Vue.component('v-dodge-bar', baseChartComponent);
        Vue.component('v-interval', baseChartComponent);
        Vue.component('v-stack-interval', baseChartComponent);
        Vue.component('v-dodge-interval', baseChartComponent);
        Vue.component('v-schema', baseChartComponent);
        Vue.component('v-line', baseChartComponent);
        Vue.component('v-smooth-line', baseChartComponent);
        Vue.component('v-dash-line', baseChartComponent);
        Vue.component('v-sector', baseChartComponent);
        Vue.component('v-area', baseChartComponent);
        Vue.component('v-stack-area', baseChartComponent);
        Vue.component('v-smooth-area', baseChartComponent);
        Vue.component('v-funnel', baseChartComponent);
        Vue.component('v-pyramid', baseChartComponent);
        Vue.component('v-box', baseChartComponent);
        Vue.component('v-candle', baseChartComponent);
        Vue.component('v-polygon', baseChartComponent);
        Vue.component('v-contour', baseChartComponent);
        Vue.component('v-heatmap', baseChartComponent);
        Vue.component('v-sankey', baseChartComponent);
        Vue.component('v-error-bar', baseChartComponent);
        Vue.component('v-jitter-point', baseChartComponent);
        Vue.component('v-path', baseChartComponent);
        Vue.component('v-plugin', baseChartComponent);
        Vue.component('v-slider', baseChartComponent);
    }
};

function safePush(obj, key, value) {
    if (!obj[key]) {
        obj[key] = [];
    }
    cleanUndefined(value);
    obj[key].push(value);
}
function oneObjectMoreArray(obj, key, value) {
    if (!obj[key]) {
        obj[key] = value;
        return;
    }
    if (obj[key] && obj[key].constructor.name === 'Object') {
        obj[key] = [obj[key]];
    }
    var indexOfSameObject = -1;
    if (value && value.viewId) {
        obj[key].forEach(function (o, i) {
            if (o && o.viewId && o.viewId === value.viewId) {
                indexOfSameObject = i;
            }
        });
    } else if (value && value.componentId) {
        obj[key].forEach(function (o, i) {
            if (o && o.componentId && o.componentId === value.componentId) {
                indexOfSameObject = i;
            }
        });
    }
    if (indexOfSameObject === -1) {
        obj[key].push(value);
    } else {
        obj[key][indexOfSameObject] = __assign({}, obj[key][indexOfSameObject], value);
    }
}
function cleanUndefined(value) {
    var newValue = __assign({}, value);
    for (var key in newValue) {
        if (newValue[key] === undefined) {
            delete newValue[key];
        }
    }
    return newValue;
}
function isAllUndefined(value) {
    return Object.keys(value).every(function (key) {
        return value[key] === undefined;
    });
}
function normalizeProps(props, include, expect) {
    if (include === void 0) {
        include = null;
    }
    if (expect === void 0) {
        expect = null;
    }
    var newProps = __assign({}, props);
    if (newProps.vStyle) {
        newProps.style = newProps.vStyle;
        delete newProps.vStyle;
    }
    if (expect !== null) {
        expect.forEach(function (propsKey) {
            delete newProps[propsKey];
        });
    }
    if (include !== null) {
        Object.keys(newProps).forEach(function (propsKey) {
            if (include.indexOf(propsKey) === -1) {
                delete newProps[propsKey];
            }
        });
    }
    return newProps;
}
function setIfNotExist(obj, key, value) {
    if (!obj[key]) {
        obj[key] = value;
    }
}
function generateRandomNum() {
    return Math.floor(new Date().getTime() + Math.random() * 10000).toString();
}
var registerAnimation = exports.registerAnimation = viser.registerAnimation;
var registerShape = exports.registerShape = viser.registerShape;
var Global = exports.Global = viser.Global;
//# sourceMappingURL=index.js.map