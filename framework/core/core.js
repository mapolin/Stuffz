// Cufon fallback if not found
var Cufon = Cufon || {refresh: function(){}, now: function(){}};

/* Define Framework Name:
    @default: Framework
*/

var _FRAMEWORK_NAME = 'EKApp'; 

(function(_name) {

    var _CORE = _name;

    if(!window[_CORE]) {

        window[_CORE] = {};

        _FRWK = eval(_CORE);

        _FRWK.is = function(source, target) {
            if(!source) return false;
            if(source && !target) return true;

            try {
                if(target == 'function' && typeof source == 'string') source = window[source];

                if(target == 'array' && typeof source == 'object') {
                    if( this.is(source.push, 'function') && this.is(source.pop, 'function') ) {
                        return true;
                    }
                }

                return typeof source == target;
            }
            catch(ex) {
                console.warn(ex.message);
                return false;
            }
        };

        _FRWK.Extend = function(name, object, overwrite, save) {
            if(!name) {
                throw 'No Function name provided.';
            }
            
            if(!object) {
                throw 'No Function body provided for ' + _CORE + '.Extend[ ' + name + ' ].'; 
            }
            
            if(name.indexOf(':') > -1) {
                var member = name.split(':')[0];
                name = name.split(':')[1];
            }
            
            if( (this[name] && !overwrite) || (this[member] && !overwrite) ) {
                if(member) {
                    if(this[member][name]) {
                        throw 'Function ' + name + ' already exists as a member of Object ' + member + '. Please change it or specify if you want to overwrite it using ' + _CORE + '.Extend(name, fn, overwrite).';
                    }
                    
                    if(typeof this[member] == 'function') {
                        throw '' + _CORE + '[ ' + member + ' ] is a Function and Methods can not be added to it. If you want to change it use: ' + _CORE + '.Extend(name, fn, overwrite).';
                    }
                } else {
                    throw 'Function ' + name + ' already exists. Please change it or specify if you want to overwrite it using ' + _CORE + '.Extend(name, fn, overwrite).';
                }
            }

            if(member && !this[member]) {
                this[member] = {};
            } else if(member && this[member] && overwrite) {
                if(save) {
                    this['_' + member] = this[member];
                }
                this[member] = {};
            }

            if(typeof object != 'function') {
                if(member) this[member][name] = {};
                else this[name] = {};
                
                    if( this.is(object, 'array') || this.is(object, 'string') || this.is(object, 'number') ) {
                        this[name] = object;
                    } else {
                        for(var prop in object) {
                            if(member) {
                                this[member][name][prop] = object[prop];
                            } else {
                                this[name][prop] = object[prop];
                            }
                        }
                    }
            } else {
                if(member) {
                    this[member][name] = object;
                } else {
                    this[name] = object;
                }
            }

            return (member) ? this[member][name] : this[name];
        };
    };

    _FRWK.Extend('parse', {
        date: function(date) {
            if(!date) {
                return this.date(new Date());
            }

            if(typeof date != 'string') {
                return ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + '/' + ((date.getDate() < 10) ? '0' : '') + date.getDate() + '/' + date.getFullYear();
            }

            else {
                var newDate = new Date(date);
                return this.date(newDate);
            }
        },
        toRem: function(value) {
            return (parseFloat(value) / this._compute()) + 'rem';
        },
        toPx: function(value) {
            return (parseFloat(value) * this._compute()) + 'px';
        },
        _compute: function() {
            if(document.defaultView && document.defaultView.getComputedStyle) {
                return parseFloat(document.defaultView.getComputedStyle(document.body,null).getPropertyValue('font-size'));
            }
            return parseFloat(
                (document.body.currentStyle ? 
                    document.body.currentStyle['fontSize'] : 
                        document.defaultView && document.defaultView.getComputedStyle ? 
                            document.defaultView.getComputedStyle(document.body,null).getPropertyValue('font-size') : 
                                document.body.style['fontSize']
                )
            );
        }
    });

    _FRWK.Extend('Device', function() {
        var device = (navigator.userAgent.match(/Android/i) && 'Android')
                     || (navigator.userAgent.match(/webOS/i) && 'webOS')
                     || (navigator.userAgent.match(/iPhone/i) && 'iPhone')
                     || (navigator.userAgent.match(/iPad/i) && 'iPad')
                     || (navigator.userAgent.match(/iPod/i) && 'iPod')
                     || (navigator.userAgent.match(/BlackBerry/i) && 'BlackBerry')
                     || (navigator.userAgent.match(/Windows Phone/i) && 'WindowsPhone');

        _FRWK._DEVICE = device;

        return device;
    })();

    _FRWK.Extend('ClassUtil', {
        swap: function(element, classes) {
            element = element;
            if( element.length == 0 ) return;

            if( this.is(classes, 'string') || classes.length < 2 ) element.removeClass( ((classes.splice) ? classes[0] : classes) );
            else if( !this.is(classes, 'string') && classes.length == 2) element.removeClass( classes[0] ).addClass( classes[1] );
            else {
                for( var i = 0, len = classes.length; i < len; i++ ) {
                    if( classes[i].on && classes[i].off ) {
                        this.ClassUtil.swap(element, [classes[i].on, classes[i].off]);
                    }
                }
            }
        }
    });

    _FRWK.Extend('Date', {
        compare: function(date1, date2) {
            if(date1 && date2 && date1.getDate() && date2.getDate()) {
                var d1 = {
                    d: date1.getDate(),
                    m: date1.getMonth(),
                    y: date1.getFullYear()
                };
                var d2 = {
                    d: date2.getDate(),
                    m: date2.getMonth(),
                    y: date2.getFullYear()
                };

                return d1.d == d2.d && d1.m == d2.m && d1.y == d2.y;
            }
            
            return false;
        }
    });

    // Expose the Framework for global usage
    window[_CORE] = _FRWK;

})(_FRAMEWORK_NAME);