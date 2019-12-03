;(function($, window, document, undefined) {
    $.createPlugin = function(pluginName, pluginImpl) {

        // basic error log function. outputs its arguments to the console.log, if it exists.
        // (if the user browser is not showing its console window, this function does nothing)
        function log() {
            if (window.console && console.log)
                console.log('[createPlugin] ' + Array.prototype.join.call(arguments, ' // '));
        }

        // basic function to help identifying javascript native (system) types,
        // returns true for arrays, dates, strings, numbers, booleans, nulls, undefined and functions.
        function isSystemType(o) {
            return (typeof o !== 'object' || Object.prototype.toString.call(o).slice(8, -1) !== 'Object');
        }

        // validates the method's input parameters
        if (typeof pluginName !== 'string' || !pluginName) {
            log('Error: you must specify a valid plugin name on the first parameter of the method.', pluginName);
            return;
        }
        if (pluginImpl == undefined || !pluginImpl || isSystemType(pluginImpl)) {
            log('Error: you must specify a valid plugin implementation on the second parameter of the method.', pluginImpl);
            return;
        }

        // validates if there's a plugin already defined with this plugin name.
        if (typeof $.fn[pluginName] === 'function') {
            log('Error: there\'s already a jQuery plugin defined with this name.', pluginName, $.fn[pluginName].constructor);
            return;
        }

        // Object.create support test,
        // and fallback implementation for browsers without native support for it.
        if (typeof Object.create !== 'function') {
            Object.create = function(o) {
                function F() {}
                F.prototype = o;
                return new F();
            };
        }

        // default (base, or abstract) jQuery plugin implementation
        var jQueryPlugin = {
            _name: '测试',
            _defaults: {},
            _init: function(pluginName, element, options) {
                this._name = pluginName;
                this.element = element;
                this.$element = $(element);
                this.options = $.extend({}, this._defaults, options)

                if (typeof this.init === 'function')
                    this.init();
            }
        };

        // jQuery plugin creation process.
        $.fn[pluginName] = function(options) {

            // slice arguments to leave only arguments after function name.
            var args = Array.prototype.slice.call(arguments, 1);

            // Cache any plugin method call, to make it possible to return a value
            var results;

            // Creates the plugin instance and tries to call its "init" function (once),
            // As well as returning the created plugin instance for subsequent calls.
            // This method also tries to execute plugin methods,
            // as long as the first argument is a string containing a valid method name.
            this.each(function() {
                var element = this,
                    $item = $(element),
                    pluginKey = 'plugin_' + pluginName,
                    instance = $.data(element, pluginKey);

                // if there's no plugin instance for this element, create a new one, calling its "init" method, if it exists.
                if (!instance) {
                    var pluginType = $.extend({}, jQueryPlugin, pluginImpl);
                    instance = $.data(element, pluginKey, Object.create(pluginType));
                    if (instance && typeof instance._init === 'function')
                        instance._init.apply(instance, [pluginName, element, options]);
                }

                // if we have an instance, and as long as the first argument (options) is a valid string value, tries to call a method from this instance.
                if (instance && typeof options === 'string' && options[0] !== '_' && options !== 'init') {

                    var methodName = (options == 'destroy' ? '_destroy' : options);
                    if (typeof instance[methodName] === 'function')
                        results = instance[methodName].apply(instance, args);

                    // Allow instances to be destroyed via the 'destroy' method
                    if (options === 'destroy')
                        $.data(element, pluginKey, null);
                }
            });

            // If the earlier cached method gives a value back, return the resulting value, otherwise return this to preserve chainability.
            return results !== undefined ? results : this;
        };
    };
}(window.jQuery, window, document));
// ***************** END // $.createPlugin() // ************************
