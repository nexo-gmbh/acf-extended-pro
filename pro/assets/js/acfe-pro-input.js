(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Checkbox
     */
    var Checkbox = acf.models.CheckboxField;

    acf.models.CheckboxField = Checkbox.extend({

        // enhance onChange method
        // this allows dynamic render for checkbox field
        onChange: function(e, $el) {

            // Vars.
            var checked = $el.prop('checked');
            var $label = $el.closest('label'); // changed $el.parent('label') to $el.closest('label')
            var $toggle = this.$toggle();

            // Add or remove "selected" class.
            if (checked) {
                $label.addClass('selected');
            } else {
                $label.removeClass('selected');
            }

            // Update toggle state if all inputs are checked.
            if ($toggle.length) {

                var $inputs = this.$inputs();

                // all checked
                if ($inputs.not(':checked').length === 0) {
                    $toggle.prop('checked', true);
                } else {
                    $toggle.prop('checked', false);
                }

            }
        }

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    acfe.newDashboardWidget = function(props) {
        return new dashboardWidget(props);
    };

    var dashboardWidget = acf.models.Postbox.extend({
        $inside: function() {
            return this.$('> .inside > form');
        },
    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * ajaxFormManager
     */
    new acf.Model({

        priority: 20,

        actions: {
            'acfe/form/validation_begin': 'validationBegin',
            'acfe/form/validation_success': 'validationSuccess',
        },

        validationBegin: function($el, validator, form) {
            if (form.get('ajax')) {
                getAjaxForm($el).removeMessage();
            }
        },

        validationSuccess: function($el, validator, form) {
            if (form.get('ajax')) {
                getAjaxForm($el).addSubmit();
            }
        },

    });


    /**
     * ajaxForm
     */
    var ajaxForm = acf.Model.extend({

        form: null,

        $sucess: null,

        setup: function($el) {
            this.$el = $el;
            this.$el.data('acfe_form_ajax', this);

            this.form = acfe.getForm($el);
        },

        addSubmit: function() {
            this.addEvents({
                'submit': 'onSubmit'
            });
        },

        onSubmit: function(e, $el) {

            // already prevented
            // might be done by payment field
            if (e.isDefaultPrevented()) {
                return true;
            }

            // prevent default
            e.preventDefault();

            // submit form
            this.submitForm();

            // remove self callback
            // in case the form is submitted multiple times
            this.removeEvents({
                'submit': 'onSubmit'
            });

        },

        submitForm: function() {

            $.ajax({
                url: acf.get('ajaxurl'),
                data: this.prepareData(),
                type: 'post',
                dataType: 'json',
                processData: false,
                contentType: false,
                context: this,
                success: this.onSuccess,
                complete: this.onComplete
            });

        },

        onSuccess: function(json) {

            // validate
            if (!acf.isAjaxSuccess(json)) {

                // errors found during submission
                // after the native acf ajax validation
                this.getValidator().addErrors(json.data);
                this.getValidator().showErrors();

                return;

            }

            // parse data
            var data = acf.parseArgs(json.data, {
                name: '',
                id: '',
                message: '',
                redirect: false,
                data: false,
            });

            // set form data
            this.form.set('name', data.name);
            this.form.set('id', data.id);
            this.form.set('success', true);
            this.form.set('success_data', data.data);

            // redirect
            if (data.redirect) {
                return window.location.href = data.redirect;
            }

            // add class
            this.$el.addClass('-success');

            // sucess message
            if (data.message.length) {

                // vars
                var $message;

                // data.message is HTML, create element
                if (this.isValidHTML(data.message)) {
                    $message = $(data.message);

                    // data.message is not HTML, create text node
                } else {
                    $message = $('<div>').html(data.message);
                }

                // prepend message and store
                this.$el.before($message);
                this.$message = $message;

                // init form and fields, if any
                acf.doAction('append', $message);

            }

            // scroll
            if (this.form.get('scroll')) {

                if (data.message.length && $message.length) {
                    acfe.scrollTo($message);
                } else {
                    acfe.scrollTo(this.$el.prev());
                }

            }

            // hide form
            if (this.form.get('hide_form')) {
                this.remove();
            }

            // reset recaptcha
            acf.getFields({
                type: 'acfe_recaptcha'
            }).map(function(field) {
                field.reset();
            });

            var $el = !this.form.get('hide_form') ? this.$el : false;
            var form = !this.form.get('hide_form') ? this.form : false;

            // hooks
            acf.doAction(`acfe/form/submit_success`, $el, form, data.data);
            acf.doAction(`acfe/form/submit_success/form=${this.form.get('name')}`, $el, form, data.data);

            // deprecated
            acfe.doActionDeprecated(`acfe/form/success`, [$el], '0.9.0.3', `acfe/form/submit_success`);
            acfe.doActionDeprecated(`acfe/form/success/id=${this.form.get('id')}`, [$el], '0.9.0.3', `acfe/form/submit_success/form=${this.form.get('name')}`);
            acfe.doActionDeprecated(`acfe/form/success/form=${this.form.get('name')}`, [$el], '0.9.0.3', `acfe/form/submit_success/form=${this.form.get('name')}`);
            acfe.doActionDeprecated(`acfe/form/success/name=${this.form.get('name')}`, [$el], '0.9.0.3', `acfe/form/submit_success/form=${this.form.get('name')}`);

            // deprecated
            acfe.doActionDeprecated(`acfe/form/submit/success`, [$el], '0.9.0.3', `acfe/form/submit_success`);
            acfe.doActionDeprecated(`acfe/form/submit/success/id=${this.form.get('id')}`, [$el], '0.9.0.3', `acfe/form/submit_success/form=${this.form.get('name')}`);
            acfe.doActionDeprecated(`acfe/form/submit/success/name=${this.form.get('name')}`, [$el], '0.9.0.3', `acfe/form/submit_success/form=${this.form.get('name')}`);

        },

        onComplete: function() {

            if (!this.form.get('hide_form')) {

                // reset validator
                // re-ask validation again
                // in case the form is re-submitted
                this.getValidator().reset();
                this.getValidator().$el.removeClass('is-');

            }

        },

        removeMessage: function() {

            // remove message in case the form is submitted multiple times
            if (this.$message) {
                this.$message.remove();
            }

        },

        prepareData: function() {

            var formData = new FormData(this.$el[0]);
            formData.append('action', 'acfe/form/ajax_submit');
            formData.append('nonce', acf.get('nonce'));

            return formData;

        },

        getValidator: function() {
            return this.$el.data('acf');
        },

        isValidHTML: function(htmlString) {

            try {
                // Try to create an HTML element from the string
                var element = document.createElement('div');
                element.innerHTML = htmlString;

                // If the first child of the created element is an HTMLElement, the string is valid HTML
                return element.firstChild instanceof HTMLElement;

            } catch (e) {
                // If an error is thrown, the string is not valid HTML
                return false;
            }

        }

    });


    /**
     * getAjaxForm
     *
     * @param $el
     * @returns {*}
     */
    var getAjaxForm = function($el) {

        // instantiate
        var form = $el.data('acfe_form_ajax');
        if (!form) {
            form = new ajaxForm($el);
        }

        // return
        return form;

    };

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Radio
     */
    var Radio = acf.models.RadioField;

    acf.models.RadioField = Radio.extend({

        // enhance onClick methid
        // this allows dynamic render for radio field
        onClick: function(e, $el) {

            // vars
            var $label = $el.closest('label'); // changed $el.parent('label') to $el.closest('label')
            var selected = $label.hasClass('selected');
            var val = $el.val();

            // remove previous selected
            this.$('.selected').removeClass('selected');

            // add active class
            $label.addClass('selected');

            // allow null
            if (this.get('allow_null') && selected) {

                $label.removeClass('selected');
                $el.prop('checked', false).trigger('change');
                val = false;

            }

            // other
            if (this.get('other_choice')) {

                // enable
                if (val === 'other') {
                    this.$inputText().prop('disabled', false);

                    // disable
                } else {
                    this.$inputText().prop('disabled', true);
                }
            }

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Block Editor
     */
    var Block_Editor = acf.Field.extend({

        type: 'acfe_block_editor',

        events: {
            'duplicateField': 'onDuplicate'
        },

        $control: function() {
            return this.$('.acfe-block-editor-wrapper');
        },

        initialize: function() {

            wp.attachEditor(this.$('textarea').get(0), this.get('settings'));

        },

        onDuplicate: function(e, $el, $duplicate) {

            $duplicate.find('.editor').first().remove();

        }

    });

    acf.registerFieldType(Block_Editor);

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Color Picker
     */
    var ColorPicker = acf.models.ColorPickerField;

    acf.models.ColorPickerField = ColorPicker.extend({

        fixedSaturation: false,

        /**
         * Get Palette
         */
        $palette: function() {
            return this.$('.acf-color-picker-palette');
        },

        /**
         * Get Color Picker
         */
        $picker: function() {
            return this.$('button.wp-color-result');
        },

        /**
         * Set Value
         */
        setValue: function(val) {

            this.updateValue(val);

            this.$inputText().iris('color', val);

        },

        /**
         * Update Value
         */
        updateValue: function(val) {

            // update input (with change)
            acf.val(this.$input(), val);

            acf.doAction('acfe/fields/color_picker/update_color', val, this);
            acf.doAction('acfe/fields/color_picker/update_color/name=' + this.get('name'), val, this);
            acf.doAction('acfe/fields/color_picker/update_color/key=' + this.get('key'), val, this);

        },

        /**
         * Initialize
         */
        initialize: function() {

            // vars
            var self = this;
            var $input = this.$input();
            var $inputText = this.$inputText();

            // Events
            this.addEvents({
                'click a[data-color]': 'onClickColor',
            });

            // Alpha
            if (this.get('alpha')) {

                $inputText.attr('data-alpha-enabled', true);
                $inputText.attr('data-alpha-color-type', 'hex');

            }

            /**
             * acf-input.js:1364
             * -----------------------------------------------------------
             */

            // Change
            var onChange = function(e) {

                // timeout is required to ensure the $input val is correct
                setTimeout(function() {
                    self.onChangeColorPicker(e);
                }, 1);

            }

            // Clear
            var onClear = function(e) {

                // timeout is required to ensure the $input val is correct
                setTimeout(function() {
                    self.onClearColorPicker(e);
                }, 1);

            }

            // Args
            var args = {
                defaultColor: false,
                palettes: false,
                hide: true,
                change: onChange,
                clear: onClear
            };

            // Colors
            if (this.get('display') === 'default' && this.get('colors')) {

                args.palettes = this.get('colors');

            }

            // Filter
            args = acf.applyFilters('color_picker_args', args, this);

            // Initialize
            $inputText.wpColorPicker(args);

            /**
             * -----------------------------------------------------------
             */

            // Unscoped Events
            this.addUnscopedEvents(this);

            // Render
            this.render();

        },

        /**
         * Unscoped Events
         */
        addUnscopedEvents: function(self) {

            // Click Color Picker
            this.$picker().on('click', function(e) {

                self.onClickColorPicker(e, $(this));

            });

        },

        /**
         * Render
         */
        render: function() {

            // Iris Styling
            var $irisStrip = this.$('.iris-strip');
            var $irisPalette = this.$('.iris-palette');
            var $irisPicker = this.$('.iris-picker');

            $irisStrip.css('height', '183px');

            // Colors
            if (this.get('display') === 'default' && this.get('colors')) {

                $irisPicker.css({
                    'height': 200 + (Math.ceil($irisPalette.length / 8) * 27) + 'px',
                    'padding-bottom': '12px'
                });

            }

            // Alpha
            if (!this.get('alpha')) {

                $irisPicker.css({
                    'width': '229px'
                });

            }

            // Palette: Check if selected value is color picker
            if (this.get('display') === 'palette' && this.$inputText().val() !== '') {

                this.$picker().addClass('selected').css({
                    'color': this.$inputText().val()
                });

            }

            // Button Label
            if (this.get('button_label') !== 'Select Color') {
                this.$picker().find('.wp-color-result-text').text(this.get('button_label'));
            }

        },

        /**
         * Change Color Picker
         */
        onChangeColorPicker: function(e) {

            // vars
            var $input = this.$input();
            var $inputText = this.$inputText();
            var $palette = this.$palette();
            var $picker = this.$picker();

            // update val
            this.updateValue($inputText.val());

            // Palette
            if (this.get('display') === 'palette') {

                $palette.find('.color').removeClass('selected');
                $picker.css({
                    'color': $inputText.val()
                }).addClass('selected');

            }

        },

        /**
         * Clear Color Picker
         */
        onClearColorPicker: function(e) {

            // vars
            var $input = this.$input();
            var $inputText = this.$inputText();
            var $palette = this.$palette();
            var $picker = this.$picker();

            // Bail early if not by user
            if (!e.originalEvent)
                return;

            // update val
            this.updateValue($inputText.val());

            // Palette
            if (this.get('display') === 'palette') {

                $palette.find('.color').removeClass('selected');
                $picker.removeClass('selected');

            }

        },

        /**
         * Click Color Picker
         */
        onClickColorPicker: function(e, $el) {

            // set saturation to the max
            // this fix colors not showing by default when empty
            if (!this.fixedSaturation) {

                if (!this.val() || (this.get('display') === 'palette' && !this.$inputText().val())) {

                    acf.val(this.$inputText(), '#ff0000');
                    acf.val(this.$inputText(), '');

                    // only once
                    this.fixedSaturation = true;

                }

            }

            if (this.get('display') === 'palette' && this.$inputText().val() !== '' && !$el.hasClass('selected')) {

                this.$palette().find('.color').removeClass('selected');
                $el.addClass('selected');

                this.updateValue(this.$inputText().val());

            }

        },

        /**
         * Click Color
         */
        onClickColor: function(e, $el) {

            var color = $el.attr('data-color');

            if ($el.hasClass('selected')) {

                if (!this.get('allow_null'))
                    return;

                this.updateValue('');
                $el.removeClass('selected');

            } else {

                //$inputText.val(color).change();
                this.updateValue(color);

                this.$palette().find('.selected').removeClass('selected');
                $el.addClass('selected hover');

                $el.on('mouseleave', function() {
                    $el.removeClass('hover');
                });

            }

        }

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Date/Time Picker
     */
    new acf.Model({

        actions: {
            'new_field/type=date_picker': 'newFieldDatePicker',
            'new_field/type=date_time_picker': 'newFieldDatePicker',
            'new_field/type=time_picker': 'newFieldDatePicker',
        },

        filters: {
            'date_picker_args': 'datePickerArgs',
            'date_time_picker_args': 'dateTimePickerArgs',
            'time_picker_args': 'timePickerArgs',
        },

        newFieldDatePicker: function(field) {

            if (field.has('placeholder')) {

                field.$inputText().attr('placeholder', field.get('placeholder'));

            }

        },

        datePickerArgs: function(args, field) {

            if (field.has('min_date')) {
                args.minDate = field.get('min_date');
            }

            if (field.has('max_date')) {
                args.maxDate = field.get('max_date');
            }

            if (field.has('no_weekends')) {
                args.beforeShowDay = $.datepicker.noWeekends
            }

            return args;

        },

        dateTimePickerArgs: function(args, field) {

            // Date
            if (field.has('min_date')) {
                args.minDate = field.get('min_date');
            }

            if (field.has('max_date')) {
                args.maxDate = field.get('max_date');
            }

            // Hour
            if (field.has('min_hour')) {
                args.hourMin = field.get('min_hour');
            }

            if (field.has('max_hour')) {
                args.hourMax = field.get('max_hour');
            }

            // Min
            if (field.has('min_min')) {
                args.minuteMin = field.get('min_min');
            }

            if (field.has('max_min')) {
                args.minuteMax = field.get('max_min');
            }

            // Sec
            if (field.has('min_sec')) {
                args.secondMin = field.get('min_sec');
            }

            if (field.has('max_sec')) {
                args.secondMax = field.get('max_sec');
            }

            // Min Time
            if (field.has('min_time')) {
                args.minTime = field.get('min_time');
            }

            // Max Time
            if (field.has('max_time')) {
                args.maxTime = field.get('max_time');
            }

            if (field.has('no_weekends')) {
                args.beforeShowDay = $.datepicker.noWeekends
            }

            return args;

        },

        timePickerArgs: function(args, field) {

            // Hour
            if (field.has('min_hour')) {
                args.hourMin = field.get('min_hour');
            }

            if (field.has('max_hour')) {
                args.hourMax = field.get('max_hour');
            }

            // Min
            if (field.has('min_min')) {
                args.minuteMin = field.get('min_min');
            }

            if (field.has('max_min')) {
                args.minuteMax = field.get('max_min');
            }

            // Sec
            if (field.has('min_sec')) {
                args.secondMin = field.get('min_sec');
            }

            if (field.has('max_sec')) {
                args.secondMax = field.get('max_sec');
            }

            // Min Time
            if (field.has('min_time')) {
                args.minTime = field.get('min_time');
            }

            // Max Time
            if (field.has('max_time')) {
                args.maxTime = field.get('max_time');
            }

            return args;

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Date Range Picker
     */
    var DateRangePicker = acf.Field.extend({

        type: 'acfe_date_range_picker',

        $control: function() {
            return this.$('.acfe-date-range-picker');
        },

        $input: function() {
            return this.$('input[type="hidden"]');
        },

        $inputText: function() {
            return this.$('input[type="text"]');
        },

        getSeparator: function() {
            return this.get('separator') ? ' ' + this.get('separator') + ' ' : ' ';
        },

        getValue: function() {

            var val = this.$input().val();
            var obj = {
                start: false,
                end: false,
            }

            if (val) {

                var explode = val.split('-');

                obj.start = moment(explode[0], 'YYYYMMDD');
                obj.end = moment(explode[1], 'YYYYMMDD');

            }

            return obj;

        },

        setValue: function(val) {

            // vars
            var $input = this.$input();
            var $inputText = this.$inputText();
            var daterangepicker = $inputText.data('daterangepicker');

            // update hidden input
            acf.val($input, val);

            if (val) {

                // readable date range
                val = daterangepicker.startDate.format(this.get('display_format')) + this.getSeparator() + daterangepicker.endDate.format(this.get('display_format'));

                // check start/end dates
                var startDate = daterangepicker.startDate.format('YYYYMMDD');
                var endDate = daterangepicker.endDate.format('YYYYMMDD');

                // single date
                if (startDate === endDate) {
                    val = daterangepicker.startDate.format(this.get('display_format'));
                }

            }

            // update date range picker
            acf.val($inputText, val, true);

        },

        initialize: function() {

            // Render
            this.render(this);

            // Add unscoped events
            this.addUnscopedEvents(this);

        },

        render: function(self) {

            // args
            var args = {

                locale: {
                    format: this.get('display_format'),
                    separator: this.getSeparator(),
                    applyLabel: acf.__('Close'),
                    cancelLabel: acf.__('Clear'),
                    firstDay: this.get('first_day')
                },

                isInvalidDate: function(date) {
                    return self.isInvalidDate(date);
                },

                autoUpdateInput: false,
                alwaysShowCalendars: true,

                buttonClasses: 'button',
                applyButtonClasses: '',
                cancelClass: ''

            };

            var val = this.val();

            if (val) {

                args.startDate = val.start;
                args.endDate = val.end;

            }

            if (this.get('show_dropdowns')) {
                args.showDropdowns = Boolean(this.get('show_dropdowns'));
            }

            if (this.get('auto_close')) {
                args.autoApply = Boolean(this.get('auto_close'));
            }

            if (this.get('min_days')) {
                args.minSpan = this.get('min_days');
            }

            if (this.get('max_days')) {
                args.maxSpan = this.get('max_days');
            }

            if (this.get('min_date')) {
                args.minDate = this.get('min_date');
            }

            if (this.get('max_date')) {
                args.maxDate = this.get('max_date');
            }

            if (this.get('custom_ranges') && this.get('custom_ranges').length) {

                args.ranges = {};

                var ranges = this.get('custom_ranges');

                if (acfe.inArray('Today', ranges)) {
                    args.ranges['Today'] = [moment(), moment()];
                }

                if (acfe.inArray('Yesterday', ranges)) {
                    args.ranges['Yesterday'] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
                }

                if (acfe.inArray('Last 7 Days', ranges)) {
                    args.ranges['Last 7 Days'] = [moment().subtract(6, 'days'), moment()];
                }

                if (acfe.inArray('Last 30 Days', ranges)) {
                    args.ranges['Last 30 Days'] = [moment().subtract(29, 'days'), moment()];
                }

                if (acfe.inArray('This Month', ranges)) {
                    args.ranges['This Month'] = [moment().startOf('month'), moment().endOf('month')];
                }

                if (acfe.inArray('Last Month', ranges)) {
                    args.ranges['Last Month'] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];
                }

            }

            // Filters
            args = acf.applyFilters('acfe/fields/date_range_picker/args', args, this);
            args = acf.applyFilters('acfe/fields/date_range_picker/args/name=' + this.get('name'), args, this);
            args = acf.applyFilters('acfe/fields/date_range_picker/args/key=' + this.get('key'), args, this);

            // Vars
            var $inputText = this.$inputText();

            // initialize
            $inputText.daterangepicker(args);

            // add classes
            $inputText.data('daterangepicker').container
                .addClass('daterangepicker-acf-field-' + this.get('name'))
                .addClass('daterangepicker-acf-field-' + this.get('key'));

            if (this.get('allow_null')) {
                $inputText.data('daterangepicker').container.addClass('daterangepicker-allow-null');
            }

            // action
            acf.doAction('acfe/fields/date_range_picker/init', $inputText, this);
            acf.doAction('acfe/fields/date_range_picker/init/name=' + this.get('name'), $inputText, this);
            acf.doAction('acfe/fields/date_range_picker/init/key=' + this.get('key'), $inputText, this);

        },

        isInvalidDate: function(date) {

            var isInvalid = false;

            // No weekends
            if (this.get('no_weekends') && (date.isoWeekday() === 6 || date.isoWeekday() === 7)) {
                isInvalid = true;
            }

            // Vars
            var $inputText = this.$inputText();

            // Filters
            isInvalid = acf.applyFilters('acfe/fields/date_range_picker/is_invalid', isInvalid, date, $inputText, this);
            isInvalid = acf.applyFilters('acfe/fields/date_range_picker/is_invalid/name=' + this.get('name'), isInvalid, date, $inputText, this);
            isInvalid = acf.applyFilters('acfe/fields/date_range_picker/is_invalid/key=' + this.get('key'), isInvalid, date, $inputText, this);

            return isInvalid;

        },

        onApply: function(e, daterangepicker) {

            this.val(daterangepicker.startDate.format('YYYYMMDD') + '-' + daterangepicker.endDate.format('YYYYMMDD'));

        },

        onClear: function(e, daterangepicker) {

            this.val('');

        },

        addUnscopedEvents: function(self) {

            this.$inputText().on('apply.daterangepicker', function(e, daterangepicker) {
                self.onApply(e, daterangepicker);
            });

            this.$inputText().on('cancel.daterangepicker', function(e, daterangepicker) {
                self.onClear(e, daterangepicker);
            });

        }

    });

    acf.registerFieldType(DateRangePicker);

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: File
     */
    var Field = acf.Field.extend({

        type: 'file',

        $control: function() {
            return this.$('.acf-file-uploader');
        },

        $input: function() {
            return this.$('input[type="hidden"]:first');
        },

        $clone: function() {
            return this.$('.file-wrap.acf-clone');
        },

        $values: function() {
            return this.$('.values');
        },

        $files: function() {
            return this.$('.values .file-wrap').not('.acf-clone');
        },

        $newFiles: function() {
            return this.$('.values .file-wrap.-new').not('.acf-clone');
        },

        $file: function($el) {
            return $el.closest('.file-wrap');
        },

        fileValue: function($el) {
            return this.$file($el).find('input[type="hidden"]').val();
        },

        fileID: function($el) {
            return this.$file($el).attr('data-id') || false;
        },

        fileByValue: function(val) {

            var field = this;
            var found = false;
            var format = false;

            if (!isNaN(val)) {

                format = true;
                val = parseInt(val);

            }

            this.$files().each(function() {

                var $this = $(this);
                var field_val = field.fileValue($this);

                if (format)
                    field_val = parseInt(field_val);

                if (field_val !== val)
                    return;

                found = $this;
                return false;


            });

            return found;

        },

        getValue: function() {
            return this.$files().length;
        },

        allowAdd: function() {
            var max = parseInt(this.get('max'));
            return (!max || max > this.$files().length);
        },

        events: {

            // WP
            'click a[data-name="add"]': 'onClickAdd',
            'click a[data-name="edit"]': 'onClickEdit',
            'click a[data-name="remove"]': 'onClickRemove',

            // Basic
            'click .values': 'onClickValues',
            'click a[data-name="basic-add"]': 'onClickBasic',
            'change input[type="file"]': 'onChangeBasic',

            // Sortable
            'mouseover': 'onHover'

        },

        addUnscopedEvents: function(self) {

            if (this.get('uploader') === 'wp') {
                return;
            }

            // Dropzone
            this.$control().on('dragover dragenter', function(e) {

                e.preventDefault();
                e.stopPropagation();

                self.$control().addClass('-dragover');

            });

            this.$control().on('dragleave dragend drop', function(e) {

                e.preventDefault();
                e.stopPropagation();

                if (e.currentTarget.contains(e.relatedTarget)) {
                    return;
                }

                self.$control().removeClass('-dragover');

            });

            this.$control().on('drop', function(e, $el) {

                // Validate with warning.
                if (!self.validateAdd()) {
                    return false;
                }

                self.$('.acf-uploader:last input').prop('files', e.originalEvent.dataTransfer.files).change();

            });

        },

        initialize: function() {

            if (this.get('uploader') === 'basic') {
                this.$el.closest('form').attr('enctype', 'multipart/form-data');
            }

            // disable clone
            acf.disable(this.$clone(), this.cid);

            this.addUnscopedEvents(this);

            // render
            this.render();

        },

        render: function() {

            this.removeNotice();

            if (!this.allowAdd()) {

                this.$control().addClass('-max');
                this.$('.acf-uploader:last a.button').addClass('disabled');
                this.$('.acf-uploader:last input').attr('disabled', true).addClass('disabled');

            } else {

                this.$control().removeClass('-max');
                this.$('.acf-uploader:last a.button').removeClass('disabled');
                this.$('.acf-uploader:last input').attr('disabled', false).removeClass('disabled');

            }

            // Control Class
            if (this.$files().length) {
                this.$control().addClass('has-value');
            } else {
                this.$control().removeClass('has-value');
            }

            // Button count
            this.$('span.count').text(this.$newFiles().length).attr('data-count', this.$newFiles().length);

        },

        validateAdd: function() {

            // return true if allowed
            if (this.allowAdd()) {
                return true;
            }

            // vars
            var max = this.get('max');
            var text = acf.__('Maximum items reached ({max} items)');

            // replace
            text = text.replace('{max}', max);

            // add notice
            this.showNotice({
                text: text,
                type: 'warning'
            });

            // return
            return false;

        },

        appendRepeater: function(attachment, parent) {

            // create function to find next available field within parent
            var getNext = function(field, parent) {

                // find existing file fields within parent
                var fields = acf.getFields({
                    key: field.get('key'),
                    parent: parent.$el
                });

                // find the first field with no value
                for (var i = 0; i < fields.length; i++) {
                    if (!fields[i].val()) {
                        return fields[i];
                    }
                }

                // return
                return false;
            }

            // find existing file fields within parent
            var field = getNext(this, parent);

            // add new row if no available field
            if (!field) {
                parent.$('.acf-button:last').trigger('click');
                field = getNext(this, parent);
            }

            // render
            if (field) {
                field.addFile(attachment);
            }

        },

        onClickAdd: function(e, $el) {

            // Validate with warning.
            if (!this.validateAdd()) {
                return false;
            }

            // vars
            var parent = this.parent();
            var parentRepeater = (parent && parent.get('type') === 'repeater');
            var args;

            // multiple file upload
            if (this.get('multiple')) {

                args = {
                    mode: 'select',
                    title: acf.__('Select File'),
                    field: this.get('key'),
                    multiple: this.get('multiple'),
                    library: this.get('library'),
                    allowedTypes: this.get('mime_types'),
                    select: $.proxy(function(attachment, i) {
                        this.addFile(attachment);
                    }, this)
                };

                // not multiple but check if repeater
            } else {

                args = {
                    mode: 'select',
                    title: acf.__('Select File'),
                    field: this.get('key'),
                    multiple: parentRepeater,
                    library: this.get('library'),
                    allowedTypes: this.get('mime_types'),
                    select: $.proxy(function(attachment, i) {
                        if (i > 0) {
                            this.appendRepeater(attachment, parent);
                        } else {
                            this.addFile(attachment);
                        }
                    }, this)
                };

            }

            // front-end only
            if (!acfe.get('is_admin')) {

                // get form
                var form = this.getForm();

                if (form && form.get('media.fields') && form.get('media.post_id')) {
                    if (acfe.inArray(this.get('key'), form.get('media.fields'))) {
                        args.post_id = form.get('media.post_id');
                    }
                }

            }

            // new frame
            acf.newMediaPopup(args);

        },

        onClickEdit: function(e, $el) {

            // popup
            acf.newMediaPopup({
                mode: 'edit',
                title: acf.__('Edit File'),
                button: acf.__('Update File'),
                attachment: this.fileValue($el),
                field: this.get('key'),
                select: $.proxy(function(attachment, i) {
                    this.editFile(attachment, $el);
                }, this)
            });

        },

        onClickRemove: function(e, $el) {

            e.preventDefault();

            if (this.get('uploader') === 'basic') {

                this.$('.acf-uploader:last input').val('');

                if (this.has('multiple')) {
                    this.$('.acf-uploader[data-id="' + this.fileID($el) + '"]').remove();
                }

            }

            // Remove File HTML
            this.$file($el).remove();

            // Render
            this.render();

            // Trigger change
            this.$input().trigger('change');

        },

        onClickValues: function(e, $el) {

            // Validate with warning.
            if (!this.validateAdd()) {
                return false;
            }

            if (!this.$control().hasClass('has-placeholder')) {
                return;
            }

            // Trigger onChange()
            $el.next('div').find('.acf-uploader:last a').click();

        },

        onClickBasic: function(e, $el) {

            // Validate with warning.
            if (!this.validateAdd()) {
                return false;
            }

            // Trigger onChange()
            $el.closest('div').find('input').click();

        },

        onChangeBasic: function(e, $el) {

            // Multiple
            if (this.has('multiple') && $el[0].files.length > 1) {

                var field = this;
                var files = $el[0].files;

                var filesArray = Array.from(files);

                for (var i = 0; i < filesArray.length; i++) {

                    var list = new DataTransfer();
                    list.items.add(filesArray[i]);

                    field.$('.acf-uploader:last input').prop('files', list.files);
                    field.addFile(field.$('.acf-uploader:last input'));

                }

                // Single
            } else {

                // Add Field
                this.addFile($el);

            }

        },

        onHover: function(e, $el) {

            // bail early if max 1 row
            if (!this.has('multiple')) {
                return;
            }

            // add sortable
            this.$values().sortable({
                items: '> .file-wrap',
                handle: '> .file-info',
                forceHelperSize: true,
                forcePlaceholderSize: true,
                tolerance: 'pointer',
                scroll: true
            });

            // remove event
            this.off('mouseover');

        },

        validateAttachment: function($file) {

            // defaults
            var attachment = $file || {};

            // WP attachment
            if (attachment.id !== undefined) {

                attachment = attachment.attributes;

                // Found an attachment ID with same ID
                if (this.fileByValue(attachment.id)) {
                    return false;
                }

            }

            // Basic field: $field
            if (this.get('uploader') === 'basic' && $file instanceof jQuery) {

                var data = this.getFileData($file);
                var param = $.param(data);

                // Found a file with same param
                if (this.fileByValue(param)) {
                    return false;
                }

                attachment = {
                    url: '#',
                    title: data.name,
                    filename: data.name,
                    filesizeHumanReadable: this.acfeBytesToSize(data.size),
                };

            }

            // args
            attachment = acf.parseArgs(attachment, {
                url: '',
                alt: '',
                title: '',
                filename: '',
                filesizeHumanReadable: '',
                icon: '/wp-includes/images/media/default.png'
            });

            // return
            return attachment;

        },

        addFile: function($file) {

            // vars
            var attachment = this.validateAttachment($file);

            // Bail early if attachment is not valid
            if (!attachment) {

                // Reset uploader value
                if (this.get('uploader') === 'basic') {
                    this.$('.acf-uploader:last input').val('');
                }

                // add notice
                this.showNotice({
                    text: 'This file has been already selected',
                    type: 'warning'
                });

                return false;

            }

            // Reset value if single
            if (!this.has('multiple')) {

                this.$files().remove();
                this.render();

            }

            // value
            var val = attachment.id || '';

            var args = {
                target: this.$clone(),
                append: this.proxy(function($el, $el2) {

                    $el2.addClass('-new');

                    this.$values().append($el2);

                    // enable
                    acf.enable($el2, this.cid);

                })
            };

            // Basic upload
            if (this.get('uploader') === 'basic') {

                // Args
                var $uploader = $file.closest('.acf-uploader');
                args.replace = $uploader.attr('data-id');

                // Parse value
                var data = this.getFileData($file);
                val = $.param(data);

                // Multiple
                if (this.has('multiple')) {

                    // Duplicate Uploader
                    acf.duplicate({
                        target: $uploader,
                        append: this.proxy(function($el, $el2) {

                            $el.after($el2);

                            $el2.find('input').val('');

                        })
                    });

                    // Hide Uploader
                    $uploader.hide();

                }

            }

            // Add file wrap
            var $el = acf.duplicate(args);

            // Update val
            acf.val($el.find('input[type="hidden"]'), val);

            // Trigger change
            this.$input().trigger('change');

            // Update Preview
            this.updatePreview($el, attachment);

            if (!this.has('basic')) {
                this.render();
            }

        },

        editFile: function($file, $el) {

            // vars
            var attachment = this.validateAttachment($file);

            $el = this.$file($el);

            // Update Preview
            this.updatePreview($el, attachment);

        },

        updatePreview: function($el, attachment) {

            // Update preview
            $el.find('[data-name="title"]').text(attachment.title);
            $el.find('[data-name="filename"]').text(attachment.filename).attr('href', attachment.url);
            $el.find('[data-name="filesize"]').text(attachment.filesizeHumanReadable);

        },

        /**
         * Based on acf.getFileInputData() in acf.js:1927
         */
        getFileData: function($input) {

            // vars
            var value = $input.val();

            // bail early if no value
            if (!value) {
                return false;
            }

            // data
            var data = {
                url: value
            };

            // modern browsers
            // Fix: https://github.com/AdvancedCustomFields/acf-pro/issues/945
            var file = $input[0].files.length ? acf.isget($input[0].files, 0) : false;

            if (!file) {
                return data;
            }

            // update data
            data.name = file.name; // Fix: Added name
            data.size = file.size;
            data.type = file.type;

            return data;

        },

        acfeBytesToSize: function(bytes) {

            var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];

            if (bytes === 0) {
                return '0 Byte';
            }

            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];

        },

    });

    acf.registerFieldType(Field);

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Flexible Content: Grid
     */
    var Field = acfe.FieldExtender({

        id: 'fc_grid',

        type: 'flexible_content',

        condition: function() {
            return this.has('acfeFlexibleGrid');
        },

        events: {
            'click [data-acfe-flexible-grid-col]': 'acfeGridOnClickCol',
            'click [data-acfe-flexible-grid-align]': 'acfeGridOnClickAlign',
        },

        initialize: function() {

            // initialize
            this.getParent(Field).initialize.apply(this, arguments);

            // add events
            this.addEvents({
                'appendLayout': 'acfeGridAppendLayout',
            });

            this.acfeResizable(this.$layoutsWrap().find('> .layout'));

        },

        acfeGridAppendLayout: function(e, $el, $layout) {

            if (this.get('acfeFlexibleGridWrap')) {

                var col = $layout.data('col');
                var allowedCol = $layout.data('allowed-col');

                // Use minimum allowed size instead of default size
                if (col > this.acfeGetAvailableCols($layout)) {

                    var min = this.acfeGetMinAllowed(allowedCol);

                    if (acfe.inArray('auto', allowedCol)) {
                        min = 'auto';
                    }

                    this.acfeUpdateCol($layout, min);

                }

            }

            $layout.removeClass('ui-resizable');
            $layout.find('.ui-resizable-handle').remove();
            this.acfeResizable($layout);

        },

        allowAdd: function() {

            if (this.getParent(Field).allowAdd.apply(this, arguments) === false) {
                return false;
            }

            return !this.isFull();

        },

        isFull: function() {

            if (!this.acfeHasAllowedLayout()) {
                return true;
            }

            return this.getParent(Field).isFull.apply(this, arguments);

        },

        getPopupHTML: function() {

            // vars
            var html = this.getParent(Field).getPopupHTML.apply(this, arguments);
            var $html = $(html);

            if (this.get('acfeFlexibleGridWrap')) {

                var self = this;
                var available = this.acfeGetAvailableCols();

                // modify popup
                $html.find('[data-layout]').each(function() {

                    var $a = $(this);
                    var $layout = self.$clone($a.data('layout'));
                    var col = $layout.data('col');
                    var allowedCol = $layout.data('allowed-col');

                    // Use minimum allowed size instead of default size
                    if (col > self.acfeGetAvailableCols()) {

                        var min = self.acfeGetMinAllowed(allowedCol);

                        if (min > available) {

                            $a.addClass('disabled');

                        }

                    }

                });

            }

            return $html.outerHTML();

        },

        onClickDuplicate: function(e, $el) {

            if (this.allowAdd() && this.get('acfeFlexibleGridWrap')) {

                var available = this.acfeGetAvailableCols();
                var $layout = $el.closest('.layout');
                var col = $layout.data('col');
                var allowedCol = $layout.data('allowed-col');

                // Use minimum allowed size instead of default size
                if (col > this.acfeGetAvailableCols()) {

                    var min = this.acfeGetMinAllowed(allowedCol);

                    if (min > available) {

                        // vars
                        var text = acf.__('This field has a limit of {max} {label} {identifier}');
                        var identifier = acf._n('layout', 'layouts', 0);

                        // replace
                        text = text.replace('{max}', '');
                        text = text.replace('{label}', '');
                        text = text.replace('{identifier}', identifier);

                        // add notice
                        this.showNotice({
                            text: text,
                            type: 'warning'
                        });

                        return false;

                    }

                }

            }

            return this.getParent(Field).onClickDuplicate.apply(this, arguments);

        },

        acfeCountCols: function($excludedEl) {

            $excludedEl = $excludedEl || false;
            var count = 0;

            $.each(this.$layouts(), function() {

                // excluded > continue
                if ($excludedEl && $(this).is($excludedEl)) {
                    return;
                }

                var col = this.getAttribute('data-col');
                col = col === 'auto' ? 1 : parseInt(col);
                count = count + col;

            });

            return count;

        },

        acfeGetAvailableCols: function($excludedEl) {
            return 12 - this.acfeCountCols($excludedEl);
        },

        acfeHasAllowedLayout: function() {

            // Flexible Wrap
            if (!this.get('acfeFlexibleGridWrap')) {
                return true;
            }

            // Count available
            var available = this.acfeGetAvailableCols();
            if (!available) {
                return false;
            }

            var self = this;
            var allowed = false;

            $.each(this.$clones(), function() {

                var $this = $(this);
                var cols = $this.data('allowed-col');
                var min = self.acfeGetMinAllowed(cols);

                if (min <= available) {

                    allowed = true;
                    return false;

                }

            });

            return allowed;

        },

        acfeGetMinAllowed: function(array) {

            array = array.map(function(col) {
                return col === 'auto' ? '1' : col;
            });

            return Math.min.apply(Math, array);

        },

        acfeHasColAuto: function() {

            var hasAuto = false;

            $.each(this.$layouts(), function() {

                if (this.getAttribute('data-col') !== 'auto') {
                    return;
                }

                hasAuto = true;
                return false;

            });

            return hasAuto;

        },

        acfeUpdateCol: function($layout, val) {

            $layout.removeClass(function(index, className) {
                return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
            }).addClass('col-' + val);

            $layout.attr('data-col', val);
            this.render();

            var $field = $layout.find('> .acfe-flexible-layout-col');

            if (!$field.length) {
                return;
            }

            $field.val(val).change();

        },

        acfeUpdateAlign: function($layout, val) {

            $layout.removeClass(function(index, className) {
                return (className.match(/(^|\s)align-\S+/g) || []).join(' ');
            }).addClass('align-' + val);

            $layout.attr('data-align', val);
            this.render();

        },

        acfeResizable: function($el) {

            var self = this;

            window.resizeWidth = 0;
            window.resizeAxis = 0;

            var acfeReduce = function(to, found, orig) {

                if (to === 1) return orig;

                to--;

                if (!acfe.inArray(to, found)) {
                    return acfeReduce(to, found, orig);
                }

                return to;

            }

            var acfeIncrease = function(to, found, orig) {

                if (to === 12) return orig;

                to++;

                if (!acfe.inArray(to, found)) {
                    return acfeIncrease(to, found, orig);
                }

                return to;

            }

            $el.resizable({
                handles: 'w, e',
                grid: [60, 10], // 720/12
                start: function(event, ui) {

                    var axis = $(this).data('ui-resizable').axis;

                    window.resizeWidth = ui.size.width;
                    window.resizeAxis = axis;

                    ui.element.addClass('ui-resizable-resizing-' + axis);

                    self.$layoutsWrap().addClass('resizing');

                },
                resize: function(event, ui) {

                    var currentWidth = ui.size.width;
                    var direction = currentWidth > window.resizeWidth ? '>' : '<';

                    window.resizeWidth = ui.size.width;

                    var target = ui.element;
                    var count = self.acfeCountCols();
                    var attr = target.attr('data-col');
                    var to = attr === 'auto' ? 1 : parseInt(attr);
                    var realCol = attr === 'auto' ? 'auto' : parseInt(attr);
                    var allowedCol = target.data('allowed-col');

                    // fix for 1 column only (auto)
                    if (allowedCol.length === 1) {
                        return false;
                    }

                    if (realCol === 'auto') {

                        to = 12 - (count - 1);
                        count = 12;

                        if (to < 1 || to > 12) {
                            to = 11;
                        }

                    }

                    var orgTo = to;
                    target.css('width', '').css('left', '');

                    if (direction === '<') {

                        if (realCol === 'auto' && to === 1) {
                            return false;
                        }

                        to = acfeReduce(to, allowedCol, to);


                    } else if (direction === '>') {

                        to = acfeIncrease(to, allowedCol, to);

                    }

                    if (self.get('acfeFlexibleGridWrap')) {

                        if (count === 12 && to !== orgTo) {

                            var sibiling, sibCol;

                            if (window.resizeAxis === 'e' && direction === '>') {
                                sibiling = target.next();

                            } else if (window.resizeAxis === 'w' && direction === '>') {
                                sibiling = target.prev();
                            }

                            if (typeof sibiling !== 'undefined' && sibiling.length) {

                                sibCol = sibiling.attr('data-col');

                                if (sibCol === 'auto') {
                                    sibCol = 1;
                                }

                                sibCol = parseInt(sibCol);
                                var orgSibCol = sibCol;
                                var allowedSibCol = sibiling.data('allowed-col');

                                sibCol = acfeReduce(sibCol, allowedSibCol, orgSibCol);

                                if (sibCol >= 1 && sibCol !== orgSibCol && (to + (count - orgTo - sibCol) <= 12)) {

                                    self.acfeUpdateCol(sibiling, sibCol);
                                    self.acfeUpdateCol(target, to);

                                }

                            }

                        }

                        if (to >= 1 && to <= 12 && (to + (count - orgTo) <= 12) && (count <= 11 || direction === '<')) {
                            self.acfeUpdateCol(target, to);
                        }

                    } else {

                        if (to >= 1 && to <= 12) {
                            self.acfeUpdateCol(target, to);
                        }

                    }

                },
                stop: function(e, ui) {

                    ui.element.removeClass('ui-resizable-resizing-' + window.resizeAxis);

                    self.$layoutsWrap().removeClass('resizing');

                }
            });

        },

        acfeGridOnClickCol: function(e, $el) {

            // Vars
            var self = this;
            var $layout = $el.closest('.layout');

            var html = this.$('.tmpl-acfe-flexible-grid-popup:last').html();
            var $html = $(html);

            var totalCols = this.acfeCountCols();
            var realCol = $layout.attr('data-col');
            var currentCol = realCol;
            var allowedCol = $layout.data('allowed-col');

            if (currentCol === 'auto')
                currentCol = 1;

            $html.find('a').each(function() {

                var $this = $(this);
                var col = $this.attr('data-col');

                if (col === realCol) {
                    $this.addClass('active');
                }

                if (allowedCol.length) {
                    if (!acfe.inArray(col, allowedCol)) {
                        $this.remove();
                    }
                }

                if (self.get('acfeFlexibleGridWrap')) {

                    if (col === 'auto') {
                        col = 1;
                    }

                    if (totalCols - currentCol + parseInt(col) > 12) {
                        $this.addClass('disabled');
                    }

                }

            });

            html = $html.outerHTML();

            // New Popup
            var popup = new Popup({
                target: $el,
                targetConfirm: false,
                text: html,
                context: this,
                confirm: function(e, $el) {

                    // check disabled
                    if (!$el.hasClass('disabled')) {
                        this.acfeUpdateCol($layout, $el.attr('data-col'));
                    }

                }
            });

            popup.on('click', 'a', 'onConfirm');

        },

        acfeGridOnClickAlign: function(e, $el) {

            // vars
            var $layout = $el.closest('.layout');

            var html = this.$('.tmpl-acfe-flexible-grid-align:last').html();

            // New Popup
            var popup = new Popup({
                target: $el,
                targetConfirm: false,
                text: html,
                context: this,
                confirm: function(e, $el) {

                    // check disabled
                    if (!$el.hasClass('disabled')) {
                        this.acfeUpdateAlign($layout, $el.attr('data-col'));
                    }

                }
            });

            popup.on('click', 'a', 'onConfirm');

        }

    });

    // Init Popup
    var Popup = acf.models.TooltipConfirm.extend({
        render: function() {
            this.html(this.get('text'));
            this.$el.addClass('acf-fc-popup');
        }
    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Google Map
     */
    new acf.Model({

        actions: {
            'google_map_init': 'mapInit',
        },

        filters: {
            'google_map_marker_args': 'markerArgs',
            'google_map_args': 'mapArgs',
        },

        mapInit: function(map, marker, field) {

            google.maps.event.addListener(marker, 'click', function(e) {
                field.onClickClear();
            });

        },

        markerArgs: function(args, field) {

            if (!field.get('acfeMarker')) {
                return args;
            }

            var marker = field.get('acfeMarker');

            marker.width = parseInt(marker.width);
            marker.height = parseInt(marker.height);

            args.icon = {
                url: marker.url,
                size: new google.maps.Size(marker.width, marker.height),
                scaledSize: new google.maps.Size(marker.width, marker.height),
            }

            return args;

        },

        mapArgs: function(args, field) {

            args.scrollwheel = true;

            if (field.get('acfeZoom')) {
                args.zoom = field.get('acfeZoom');
            }

            if (field.get('acfeMinZoom')) {
                args.minZoom = field.get('acfeMinZoom');
            }

            if (field.get('acfeMaxZoom')) {
                args.maxZoom = field.get('acfeMaxZoom');
            }

            if (field.get('acfeMapType')) {
                args.mapTypeId = field.get('acfeMapType');
            }

            if (field.get('acfeDisableUi')) {
                args.disableDefaultUI = true;
            }

            if (field.get('acfeDisableZoomControl')) {
                args.zoomControl = false;
                args.scrollwheel = false;
            }

            if (field.get('acfeDisableMapType')) {
                args.mapTypeControl = false;
            }

            if (field.get('acfeDisableFullscreen')) {
                args.fullscreenControl = false;
            }

            if (field.get('acfeDisableStreetview')) {
                args.streetViewControl = false;
            }

            if (field.get('acfeStyle')) {
                args.styles = field.get('acfeStyle');
            }

            return args;

        }

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Image Selector
     */
    var ImageSelector = acf.Field.extend({

        type: 'acfe_image_selector',

        events: {
            'click input[type="radio"]': 'onClickRadio',
            'click input[type="checkbox"]': 'onClickCheckbox',
        },

        $control: function() {
            return this.$('.acfe-image-selector');
        },

        $input: function() {
            return this.$('input:checked');
        },

        getValue: function() {

            // Radio
            var val = this.$input().val();

            // Checkbox
            if (this.get('multiple')) {

                val = [];

                this.$input().each(function() {
                    val.push($(this).val());
                });

                val = val.length ? val : false;

            }

            return val;
        },

        onClickRadio: function(e, $el) {

            // vars
            var $label = $el.closest('label');
            var selected = $label.hasClass('selected');

            // remove previous selected
            this.$('.selected').removeClass('selected');

            // add active class
            $label.addClass('selected');

            // allow null
            if (this.get('allow_null') && selected) {
                $label.removeClass('selected');
                $el.prop('checked', false).trigger('change');
            }

        },

        onClickCheckbox: function(e, $el) {

            // Vars.
            var $label = $el.closest('label');
            var selected = $label.hasClass('selected');

            // add active class
            if (selected) {

                if (this.get('allow_null') || this.$input().length) {
                    $label.removeClass('selected');
                } else {
                    e.preventDefault();
                }

            } else {

                $label.addClass('selected');

            }

        },

    });

    acf.registerFieldType(ImageSelector);

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Payment
     */
    var PaymentField = acf.Field.extend({

        wait: 'ready',

        type: 'acfe_payment',

        gateway: false,

        selectors: [],

        events: {
            'click .acfe-payment-paypal-button': 'onClickPaypal',
            'showField': 'onShowField',
        },

        onShowField: function(e, $el, context) {
            if (this.get('gateway') === 'paypal' && this.get('paypalHidden') && context === 'conditional_logic') {
                this.hide();
            }
        },

        $control: function() {
            return this.$('.acfe-payment-wrap');
        },

        $button: function() {
            return this.$('.acfe-payment-button');
        },

        $buttonWrap: function() {
            return this.$('.acfe-payment-button-wrap');
        },

        $paypalButton: function() {
            return this.$('.acfe-payment-paypal-button');
        },

        $paypalWrap: function() {
            return this.$('.acfe-payment-paypal');
        },

        onClickPaypal: function(e, $el) {
            e.preventDefault();
        },

        hasGateway: function(gateway, only = false) {

            var condition = !only || this.get('gateways').length === 1;

            return acfe.inArray(gateway, this.get('gateways')) && condition;

        },

        getSelectors: function() {

            var self = this;
            var selectors = [];
            var fields = ['acfe_payment_selector_radio', 'acfe_payment_selector_select'];

            fields.map(function(selector) {

                acf.getFields({
                    type: selector
                }).map(function(field) {

                    if (field.get('paymentField') !== self.get('key')) return;

                    selectors.push(field);

                });

            });

            return selectors;

        },

        enableSelectors: function() {

            this.getSelectors().map(function(selector) {
                selector.enable();
            });

        },

        disableSelectors: function() {

            this.getSelectors().map(function(selector) {
                selector.disable();
            });

        },

        switchGateway: function(newGateway) {

            // gateway not available
            if (!this.hasGateway(newGateway)) {
                return;
            }

            // destroy gateway
            this.$('.acfe-payment-gateway').addClass('acf-hidden');

            // reset val
            this.val('');

            // new gateway
            this.set('gateway', newGateway);
            this.$control().attr('data-gateway', newGateway);

            // update selectors
            this.getSelectors().map(function(selector) {
                if (selector.val() !== newGateway) {
                    selector.val(newGateway);
                }
            });

            // init
            this.initialize();

        },

        initialize: function() {

            // switch to stripe
            if (this.get('gateway') === 'stripe') {

                // show if no button
                if (!this.$button().length) this.show();

                this.gateway = new StripeGateway(this);

                // switch to paypal
            } else if (this.get('gateway') === 'paypal') {

                // hide if no button
                if (!this.$button().length) {
                    this.hide();
                }

                // set default value for required field
                this.val('paypal');

            }

        },

    });

    acf.registerFieldType(PaymentField);

    /**
     * Stripe Gateway
     */
    var StripeGateway = acf.Model.extend({

        field: false,

        stripe: false,

        card: false,

        setup: function(field) {

            // set $el
            this.$el = field.$el;

            // set field
            this.field = field;

        },

        $wrap: function() {
            return this.$('.acfe-payment-stripe');
        },

        onCardChange: function(e) {

            if (e.complete) {

                this.field.val('valid');
                this.field.removeError();

            } else if (e.empty) {

                this.field.val('');
                this.field.removeError();

            } else if (e.error) {

                this.field.val('invalid');
                this.field.showError(e.error.message);

            } else if (!e.complete) {

                this.field.val('invalid');

            }

        },

        initialize: function() {

            // vars
            var self = this;
            var $wrap = this.$wrap();

            // show
            $wrap.removeClass('acf-hidden');

            // instantiate
            this.stripe = Stripe(this.field.get('publicKey'));

            // args
            var args = {
                hidePostalCode: Boolean(this.field.get('hide_zip')),
                style: {
                    base: {
                        fontFamily: $wrap.css('font-family'),
                        color: $wrap.css('color'),
                        fontSize: $wrap.css('font-size'),
                        backgroundColor: $wrap.css('background-color'),
                        fontSmoothing: 'antialiased',
                        '::placeholder': {
                            color: "#3c434a"
                        }
                    },
                    invalid: {
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                        color: "#b32d2e",
                        iconColor: "#b32d2e"
                    }
                }
            };

            // filters
            args = acf.applyFilters('acfe/fields/payment/stripe_args', args, this.field);
            args = acf.applyFilters('acfe/fields/payment/stripe_args/name=' + this.field.get('name'), args, this.field);
            args = acf.applyFilters('acfe/fields/payment/stripe_args/key=' + this.field.get('key'), args, this.field);

            // card: create
            this.card = this.stripe.elements().create('card', args);

            // card: mount
            this.card.mount($wrap[0]);

            // card: change
            this.card.on('change', function(e) {
                self.onCardChange(e);
            });

        }

    });

    /**
     * Form Submit
     */
    new acf.Model({

        field: false,

        $form: false,

        validator: false,

        event: false,

        actions: {
            'validation_begin': 'onValidationBegin',
            'validation_failure': 'onValidationFailure',
            'validation_success': 'onValidationSuccess',
        },

        enableButton: function() {

            acf.enableSubmit(this.field.$button());
            this.field.$button().removeAttr('disabled');

        },

        disableButton: function() {

            acf.disableSubmit(this.field.$button());
            this.field.$button().attr('disabled', true);

        },

        unlockForm: function() {

            this.enableButton();
            this.validator.reset();

        },

        lockForm: function() {

            this.disableButton();
            acf.lockForm(this.$form);

        },

        submitForm: function() {

            // no event
            if (!this.event) {
                return this.$form.submit();
            }

            // create event
            var event = $.Event(null, this.event);
            acf.enableSubmit($(event.target)).trigger(event);

        },

        preventFormSubmit: function() {

            var $form = this.$form;
            var validator = this.validator;

            var formSubmit = function(e) {
                e.preventDefault();
            };

            $form.on('submit', formSubmit);

            validator.setTimeout(function() {
                $form.off('submit', formSubmit);
            }, 300);

        },

        getPaymentField: function($form) {

            // we must get any payment field (visible or not)
            // because paypal gateway is hidden by default
            var field = acf.getFields({
                type: 'acfe_payment',
                parent: $form,
                //visible: true, // manually checked later
                limit: 1
            }).shift();

            if (!field) {
                return false;
            }

            // assume field is visible even if within tab
            // the only rule that should be check is conditional logic
            var visible = true;

            // manually check if hidden by condition
            if (field.has('conditions')) {
                visible = field.getConditions().calculate();
            }

            if (visible) {
                return field;
            }

            return false;

        },

        onValidationBegin: function($form) {

            // set field
            this.field = this.getPaymentField($form);

            // no field found
            if (!this.field) {
                return;
            }

            // set global
            this.$form = $form;

            // lock form
            this.lockForm();

        },

        onValidationFailure: function($form, validator) {

            // no field found
            if (!this.field) {
                return;
            }

            // set global
            this.validator = validator;

            // unlock form
            //this.unlockForm();
            this.enableButton();

        },

        onValidationSuccess: function($form, validator) {

            // no field found
            if (!this.field) {
                return;
            }

            // globals
            this.validator = validator;
            this.event = acf.validation.get('originalEvent');

            // vars
            var self = this;
            var field = this.field;

            // stripe
            if (field.get('gateway') === 'stripe') {

                // check field is required or has any value
                if (!field.has('required') && field.val() === '') {
                    return;
                }

                // prevent form submit
                this.preventFormSubmit();

                // process stripe
                this.processStripe();

                // paypal
            } else if (field.get('gateway') === 'paypal') {

                // payment already confirmed
                if (field.val() !== 'paypal') {
                    return;
                }

                // prevent form submit
                this.preventFormSubmit();

                // process paypal
                this.processPaypal();

            }

        },

        processStripe: function() {

            // vars
            var self = this;
            var field = this.field;
            var $form = this.$form;

            // ajax data
            var ajaxData = {
                action: 'acfe/payment_request',
                gateway: 'stripe',
                field_key: field.get('key'),
                fields: acf.serialize($form, 'acf')
            };

            // send ajax
            $.ajax({
                url: acf.get('ajaxurl'),
                data: acf.prepareForAjax(ajaxData),
                type: 'post',
                dataType: 'json',
                context: this,
                success: function(json) {

                    // error
                    if (!json.success) {

                        field.showError(json.data.error);
                        self.unlockForm();

                        return;

                    }

                    // success
                    field.gateway.stripe
                        .confirmCardPayment(json.data.secret, {
                            payment_method: {
                                card: field.gateway.card
                            }
                        })
                        .then(function(result) {

                            // error
                            if (result.error) {

                                field.showError(result.error.message);
                                self.unlockForm();

                                // success
                            } else {

                                // lock
                                self.lockForm();

                                // ajax data
                                var ajaxDataConfirm = {
                                    action: 'acfe/stripe_confirm',
                                    intent_id: result.paymentIntent.id,
                                    field_key: field.get('key'),
                                    fields: acf.serialize($form, 'acf')
                                };

                                // send ajax
                                $.ajax({
                                    url: acf.get('ajaxurl'),
                                    data: acf.prepareForAjax(ajaxDataConfirm),
                                    type: 'post',
                                    dataType: 'json',
                                    context: this,
                                    success: function(json) {

                                        if (json.success) {

                                            field.val(json.data.response);
                                            self.submitForm();

                                        } else {

                                            field.showError(json.data.error);
                                            self.unlockForm();

                                        }

                                    },
                                });

                            }

                        });

                },
            });

        },


        processPaypal: function() {

            // vars
            var self = this;
            var field = this.field;
            var $form = this.$form;

            // paypal vars
            var $paypalButton = field.$paypalButton();
            var $paypalWrap = field.$paypalWrap();

            // check if field is hidden (paypal only and no button)
            var isHidden = acf.isHidden(field.$el);

            var environment = field.get('mode') === 'test' ? 'sandbox' : 'production';

            // setup paypal
            // https://developer.paypal.com/docs/archive/express-checkout/in-context/javascript-advanced-settings/
            paypal.checkout.setup(field.get('merchantId'), {
                buttons: [$paypalButton[0]],
                environment: environment,
                click: this.proxy(this.processPaypalClick),
            });

            // chrome
            if (acf.get('browser') === 'chrome') {

                // auto click
                $paypalButton[0].click();

                // other browsers
            } else {

                // hide button
                field.$buttonWrap().hide();

                // show paypal button
                $paypalWrap.removeClass('acf-hidden');

                // disable gateway selector
                field.disableSelectors();

                // hide spinner
                this.setTimeout(function() {

                    acf.hideSpinner(acfe.findSpinner(this.$form));

                    // remove disabled class added by form lock
                    // can't use this.unlockForm() as it reset validator
                    $paypalButton.removeClass('disabled');
                    $paypalButton.removeAttr('disabled');

                    // hidden by tab
                    // show field within tab
                    if (field.hiddenByTab) {
                        field.hiddenByTab.toggle();
                    }

                }, 300);

                // if field is hidden, temporarily show it
                if (isHidden) {
                    field.show();
                }

            }

        },

        processPaypalClick: function() {

            // vars
            var self = this;
            var field = this.field;
            var $form = this.$form;

            // paypal vars
            var $paypalButton = field.$paypalButton();
            var $paypalWrap = field.$paypalWrap();

            // check if field is hidden (paypal only and no button)
            var isHidden = acf.isHidden(field.$el);

            // always reset allowing to click again
            paypal.checkout.reset();

            // open popup
            paypal.checkout.initXO();

            // unlock form
            setTimeout(function() {
                self.unlockForm();
            }, 300);

            // hide paypal wrap
            $paypalWrap.addClass('acf-hidden');

            // other browsers
            if (acf.get('browser') !== 'chrome') {

                // show button
                field.$buttonWrap().show();

                // enable gateway selector
                field.enableSelectors();

                // if field is supposed to be hidden, hide it
                if (isHidden) {
                    field.hide();
                }

            }

            // ajax data
            var ajaxData = {
                action: 'acfe/payment_request',
                gateway: 'paypal',
                field_key: field.get('key'),
                fields: acf.serialize($form, 'acf')
            };

            // send ajax
            $.ajax({
                url: acf.get('ajaxurl'),
                data: acf.prepareForAjax(ajaxData),
                type: 'post',
                dataType: 'json',
                context: this,
                success: function(json) {

                    if (json.success) {

                        acf.doAction('acfe/fields/payment/create_success', json.data, $form, this.field, this);

                        paypal.checkout.startFlow(json.data.url);

                    } else {

                        paypal.checkout.closeFlow();
                        field.showError(json.data.error);
                        field.show();

                    }

                    // listen for callback
                    window.addEventListener('hashchange', function() {

                        // split url with #
                        var url = acfe.getCurrentUrl().split('#'); // https://www.domain.com/page
                        var parts = '/' + url[1]; // /?token=EC-013494918W570690J&PayerID=ATAADCVJVFY7G

                        // parse url
                        var data = acfe.getQueryArgs(parts);

                        // payment done
                        if (data.token && data.PayerID) {

                            // remove parts from url
                            window.history.replaceState({}, document.title, url[0]);

                            // lock form
                            self.lockForm();

                            // ajax data
                            var ajaxDataConfirm = {
                                action: 'acfe/paypal_confirm',
                                token: data.token,
                                payer_id: data.PayerID,
                                field_key: field.get('key'),
                                fields: acf.serialize($form, 'acf')
                            };

                            // send ajax
                            $.ajax({
                                url: acf.get('ajaxurl'),
                                data: acf.prepareForAjax(ajaxDataConfirm),
                                type: 'post',
                                dataType: 'json',
                                context: this,
                                success: function(json) {

                                    if (json.success) {

                                        field.val(json.data.response);
                                        self.submitForm($form, event);

                                    } else {

                                        field.showError(json.data.error);
                                        self.unlockForm();

                                    }

                                },
                            });

                            // payment cancelled
                        } else if (data.token && !data.PayerID) {

                            // remove parts from url
                            window.history.replaceState({}, document.title, url[0]);

                            // show error
                            field.showError(acf.get('paymentL10n').paymentCancelled);
                            self.unlockForm();

                        }

                    });

                },
            });

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    var Select = acf.models.SelectField;

    var PaymentSelectorSelect = Select.extend({

        wait: false,

        type: 'acfe_payment_selector_select',

        paymentField: false,

        onChange: function(e, $el) {
            this.paymentField.switchGateway(this.val());
        },

        initialize: function() {

            Select.prototype.initialize.apply(this, arguments);

            // get payment field
            this.paymentField = acf.getField(this.get('paymentField'));

            // no gateway set in attr
            if (!this.paymentField.has('gateway')) {
                return;
            }

            // add events
            this.addEvents({
                'change': 'onChange',
            });

        },

    });

    acf.registerFieldType(PaymentSelectorSelect);

    var Radio = acf.models.RadioField;

    var PaymentSelectorRadio = Radio.extend({

        wait: false,

        type: 'acfe_payment_selector_radio',

        paymentField: false,

        onChange: function(e, $el) {
            this.paymentField.switchGateway(this.val());
        },

        initialize: function() {

            Radio.prototype.initialize.apply(this, arguments);

            // add class to radio <li> for customization
            this.$(':radio').each(function() {

                var $input = $(this);
                $input.closest('li').addClass('-' + $input.val());

            });

            // get payment field
            this.paymentField = acf.getField(this.get('paymentField'));

            // no gateway set in attr
            if (!this.paymentField.has('gateway')) {
                return;
            }

            // add events
            this.addEvents({
                'change': 'onChange',
            });

        },

    });

    acf.registerFieldType(PaymentSelectorRadio);

    /**
     * Payment Selector Select2
     */
    new acf.Model({

        filters: {
            'select2_args/type=acfe_payment_selector_select': 'selectArgs',
        },

        selectArgs: function(options, $select, data, field, instance) {

            options.minimumResultsForSearch = -1;

            return options;

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Phone Number
     */
    var PhoneNumber = acf.Field.extend({

        wait: false,

        type: 'acfe_phone_number',

        actions: {
            'load': 'delayedInitialize'
        },

        events: {
            'keyup input[type="tel"]': 'onChange',
            'change input[type="tel"]': 'onChange',
            'countrychange input[type="tel"]': 'onChange',
        },

        $control: function() {
            return this.$('.acfe-phone-number');
        },

        $tel: function() {
            return this.$('input[type="tel"]');
        },

        setValue: function(val, silent) {

            // update value
            acf.val(this.$input(), val, silent);

            // bail early if silent
            if (silent) {
                return;
            }

            this.busy = true;

            // render value
            this.renderValue(val);

            this.busy = false;

        },

        renderValue: function(val) {

            // input value
            acf.val(this.$tel(), val, true);

            // bail early
            if (typeof intlTelInputUtils === 'undefined') {
                return;
            }

            // iti value
            var iti = this.get('iti');
            var itiVal = iti.getNumber(intlTelInputUtils.numberFormat.E164);

            if (typeof itiVal !== 'string') {
                return;
            }

            iti.setNumber(itiVal);

        },

        onChange: function() {

            if (this.busy) {
                return;
            }

            this.setValue(this.getItiData());

        },

        getItiData: function() {

            if (typeof intlTelInputUtils === 'undefined') {
                return;
            }

            var iti = this.get('iti');

            // retrieve data using iti utils
            return iti.getNumber(intlTelInputUtils.numberFormat.E164);

        },

        initialize: function() {

            // classic editor init
            if (acf.get('editor') === 'classic') {
                this.render(this);

                // gutenberg init
                // this is required to init phone number in repeater on gutenberg
            } else if (acf.get('editor') === 'block' && acf.didAction('load')) {
                this.render(this);
            }

        },

        delayedInitialize: function() {

            // gutenberg init
            // fix field padding calculation
            if (acf.get('editor') === 'block') {
                this.render(this);
            }

        },

        render: function(self) {

            // vars
            var onlyCountries = this.get('countries') || [];
            var preferredCountries = this.get('preferred_countries') || [];
            var defaultCountry = this.get('default_country') || '';
            var placeholder = this.get('placeholder') || '';

            // add preferred countries to allowed countries
            if (preferredCountries.length && onlyCountries.length) {

                preferredCountries.map(function(country) {
                    if (!acfe.inArray(country, onlyCountries)) {
                        onlyCountries.push(country);
                    }
                });

            }

            // check default value exists in allowed countries
            if (defaultCountry && onlyCountries.length && !acfe.inArray(defaultCountry, onlyCountries)) {

                defaultCountry = onlyCountries[0];

                if (preferredCountries.length) {
                    defaultCountry = preferredCountries[0];
                }

            }

            var args = {};

            // default Settings
            args.excludeCountries = ['ac', 'io', 'gg', 'mf', 'sj', 'ax'];
            args.utilsScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.min.js';

            // settings
            args.onlyCountries = onlyCountries;
            args.initialCountry = defaultCountry;
            args.preferredCountries = preferredCountries;
            args.localizedCountries = {};
            args.allowDropdown = this.get('dropdown') || false;
            args.separateDialCode = this.get('dial_code') || false;
            args.nationalMode = this.get('national') || false;
            args.autoPlaceholder = 'aggressive';
            args.customPlaceholder = function(countryPlaceholder, countryData) {
                return acf.strReplace('{placeholder}', countryPlaceholder, placeholder);
            }

            // native Names
            if (this.get('native')) {

                var countries = window.intlTelInputGlobals.getCountryData();

                for (var i = 0; i < countries.length; i++) {
                    var country = countries[i];
                    args.localizedCountries[country.iso2] = country.name.replace(/.+\((.+)\)/, "$1");
                }

            }

            // geolocation
            if (this.get('geolocation')) {

                // default country to auto
                args.initialCountry = 'auto';

                // geoIPLookup
                args.geoIpLookup = function(success, failure) {

                    // url
                    var url = 'https://ipinfo.io/';

                    // append token
                    if (self.get('geolocation_token')) {
                        url = url + '?token=' + self.get('geolocation_token');
                    }

                    // ajax query
                    $.ajax({
                        url: url,
                        data: false,
                        method: 'get',
                        dataType: 'json'
                    }).always(function(response) {

                        var countryCode = (response && response.country) ? response.country.toLowerCase() : '';

                        // country found
                        if (countryCode) {

                            if (onlyCountries.length && !acfe.inArray(countryCode, onlyCountries)) {

                                countryCode = onlyCountries[0];

                                if (preferredCountries.length) {
                                    countryCode = preferredCountries[0];
                                }

                            }

                            // country not found
                        } else {

                            countryCode = 'us';

                            if (preferredCountries.length) {
                                countryCode = preferredCountries[0];
                            } else if (onlyCountries.length) {
                                countryCode = onlyCountries[0];
                            }

                        }

                        success(countryCode);

                    });

                };

            }

            // initialize
            var input = this.$tel()[0];
            var iti = window.intlTelInput(input, args);

            // save iti instance
            this.set('iti', iti);

            // iti initialize
            iti.promise.then(function() {
                self.itiInitialize();
            });

            // input open dropdown
            input.addEventListener('open:countrydropdown', function() {
                self.resizeDropdown();
            });

            // window resize
            $(window).on('resize', function() {
                self.resizeDropdown();
            });

        },

        itiInitialize: function() {

            // bail early if no value
            if (!this.$tel().val()) {
                return;
            }

            // default Value
            this.setValue(this.getItiData(), true);

        },

        resizeDropdown: function() {

            // get width
            var width = this.$tel().outerWidth();

            // check if hidden field
            if (width === 0) {
                width = 350;
            }

            this.$('.iti__country-list').width(width);

        }

    });

    acf.registerFieldType(PhoneNumber);

    // validation
    new acf.Model({

        filters: {
            'validation_complete': 'validationComplete'
        },

        validationComplete: function(data, $form, validator) {

            // get phone number fields
            var fields = acf.getFields({
                type: 'acfe_phone_number',
                parent: $form
            });

            if (!fields.length) {
                return data;
            }

            // error map
            var errorMap = [
                acf.get('phoneNumberL10n').invalidPhoneNumber,
                acf.get('phoneNumberL10n').invalidCountry,
                acf.get('phoneNumberL10n').phoneNumberTooShort,
                acf.get('phoneNumberL10n').phoneNumberTooLong,
                acf.get('phoneNumberL10n').invalidPhoneNumber
            ];

            // loop fields
            fields.map(function(field) {

                // get iti
                var iti = field.get('iti');
                var country = iti.getSelectedCountryData();

                // bail early if empty value of valid number
                if (!field.val() || (iti.isValidNumber() && country.iso2)) {
                    return;
                }

                // vars
                var errorCode = iti.getValidationError();
                var input = field.getInputName();
                var message = errorMap[errorCode] || acf.get('phoneNumberL10n').invalidPhoneNumber;

                // data
                data.valid = 0;
                data.errors = data.errors || [];

                // push error
                data.errors.push({
                    input: input,
                    message: message
                });

            });

            return data;

        }

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    // vars
    var wait = false;

    // bricks compatibility
    // this fix the content field not being moved
    if ($('#bricks-admin-css').length) {
        wait = 'ready';
    }

    /**
     * Field: Post Field
     */
    var Post_Field = acf.Field.extend({

        wait: wait,

        type: 'acfe_post_field',

        initialize: function() {

            // Function name: moveTitle
            var fn = acf.strCamelCase('move_' + this.get('fieldType'));

            if (typeof this[fn] === 'undefined') {
                return;
            }

            this[fn]();

        },

        checkMiscActions: function() {

            var $minorPublishing = $('#minor-publishing');
            var minorPublishingContent = $minorPublishing.text().trim();

            if (minorPublishingContent.length) {
                return;
            }

            $minorPublishing.hide();

        },

        checkField: function($selector, parent = 1) {

            var $field = $selector;
            var parent_exists = $field.parent().hasClass('acf-input');

            if (parent === 2) {
                parent_exists = $field.parent().parent().hasClass('acf-input');
            }

            if (!$field.length || parent_exists) {
                this.$el.remove();
                return false;
            }

            return $field.appendTo(this.$inputWrap());

        },

        moveAttributes: function() {

            var $field = this.checkField($('#pageparentdiv > .inside'));

            if (!$field) {
                return;
            }

            $('#pageparentdiv').remove();
            $('.metabox-prefs > label[for="pageparentdiv-hide"]').remove();

        },

        moveAuthor: function() {

            var type = 'acfe';
            var $selector = $('#acfe-author > .inside');

            if (!$selector.length) {
                type = 'wp';
                $selector = $('#authordiv > .inside');
            }

            var $field = this.checkField($selector);

            if (!$field) {
                return;
            }

            if (type === 'acfe') {

                $('#acfe-author').remove();
                $('.metabox-prefs > label[for="acfe-author-hide"]').remove();

            } else {

                $('#authordiv').remove();
                $('.metabox-prefs > label[for="authordiv-hide"]').remove();

            }

        },

        moveComments: function() {

            var $field = this.checkField($('#commentsdiv > .inside'), 2);

            if (!$field) {
                return;
            }

            $field.wrapAll('<div id="commentsdiv" />');

            $('#normal-sortables > #commentsdiv').remove();
            $('.metabox-prefs > label[for="commentsdiv-hide"]').remove();

        },

        moveContent: function() {

            var $field = this.checkField($('#postdivrich'));

            if (!$field) {
                return;
            }

            this.addEvents({
                'showField': 'reinitContent'
            });

        },

        reinitContent: function() {

            if (!window.tinymce) {
                return;
            }

            var editor = window.tinymce.get('content');

            if (!editor) {
                return;
            }

            editor.fire('show');

            this.setTimeout(function() {
                editor.fire('show');
            }, 400)

        },

        moveDate: function() {

            var $field = this.checkField($('.misc-pub-curtime'));

            if (!$field) {
                return;
            }

            this.checkMiscActions();

        },

        moveDiscussion: function() {

            var $field = this.checkField($('#commentstatusdiv > .inside'));

            if (!$field) {
                return;
            }

            $('#commentstatusdiv').remove();
            $('.metabox-prefs > label[for="commentstatusdiv-hide"]').remove();

        },

        moveExcerpt: function() {

            var $field = this.checkField($('#postexcerpt > .inside'));

            if (!$field) {
                return;
            }

            $('#postexcerpt').remove();
            $('.metabox-prefs > label[for="postexcerpt-hide"]').remove();

        },

        moveFeaturedImage: function() {

            var $field = this.checkField($('#postimagediv > .inside'), 2);

            if (!$field) {
                return;
            }

            $field.wrapAll('<div id="postimagediv" />');

            $('#side-sortables > #postimagediv').remove();
            $('.metabox-prefs > label[for="postimagediv-hide"]').remove();

        },

        moveName: function() {

            var $field = this.checkField($('#slugdiv > .inside'));

            if (!$field) {
                return;
            }

            $('#slugdiv').remove();
            $('.metabox-prefs > label[for="slugdiv-hide"]').remove();

        },

        movePermalink: function() {

            var $field = this.checkField($('#edit-slug-box'));

            if (!$field) {
                return;
            }

            $field.find('> strong').remove();

            var $nonce = $('#samplepermalinknonce');
            $nonce.appendTo(this.$inputWrap());

            this.addEvents({
                'click .edit-slug': 'onClickPermalink',
            });

        },

        onClickPermalink: function() {

            /**
             * Source: /wp-admin/js/post.js:947
             */
            var i, slug_value,
                $el, revert_e,
                c = 0,
                postId = $('#post_ID').val() || 0,
                real_slug = $('#post_name'),
                revert_slug = real_slug.val(),
                permalink = $('#sample-permalink'),
                permalinkOrig = permalink.html(),
                permalinkInner = $('#sample-permalink a').html(),
                buttons = $('#edit-slug-buttons'),
                buttonsOrig = buttons.html(),
                full = $('#editable-post-name-full');

            // Deal with Twemoji in the post-name.
            full.find('img').replaceWith(function() {
                return this.alt;
            });
            full = full.html();

            permalink.html(permalinkInner);

            // Save current content to revert to when cancelling.
            $el = $('#editable-post-name');
            revert_e = $el.html();

            buttons.html('<button type="button" class="save button button-small">' + acf.__('OK') + '</button> <button type="button" class="cancel button-link">' + acf.__('Cancel') + '</button>');

            // Save permalink changes.
            buttons.children('.save').click(function() {
                var new_slug = $el.children('input').val();

                if (new_slug == $('#editable-post-name-full').text()) {
                    buttons.children('.cancel').click();
                    return;
                }

                $.post(
                    ajaxurl, {
                        action: 'sample-permalink',
                        post_id: postId,
                        new_slug: new_slug,
                        new_title: $('#title').val(),
                        samplepermalinknonce: $('#samplepermalinknonce').val()
                    },
                    function(data) {
                        var box = $('#edit-slug-box');
                        box.html(data);

                        box.find('> strong').remove();

                        if (box.hasClass('hidden')) {
                            box.fadeIn('fast', function() {
                                box.removeClass('hidden');
                            });
                        }

                        buttons.html(buttonsOrig);
                        permalink.html(permalinkOrig);
                        real_slug.val(new_slug);
                        $('.edit-slug').focus();
                        wp.a11y.speak(postL10n.permalinkSaved);
                    }
                );
            });

            // Cancel editing of permalink.
            buttons.children('.cancel').click(function() {
                $('#view-post-btn').show();
                $el.html(revert_e);
                buttons.html(buttonsOrig);
                permalink.html(permalinkOrig);
                real_slug.val(revert_slug);
                $('.edit-slug').focus();
            });

            // If more than 1/4th of 'full' is '%', make it empty.
            for (i = 0; i < full.length; ++i) {
                if ('%' == full.charAt(i))
                    c++;
            }
            slug_value = (c > full.length / 4) ? '' : full;

            $el.html('<input type="text" id="new-post-slug" value="' + slug_value + '" autocomplete="off" />').children('input').keydown(function(e) {
                var key = e.which;
                // On [Enter], just save the new slug, don't save the post.
                if (13 === key) {
                    e.preventDefault();
                    buttons.children('.save').click();
                }
                // On [Esc] cancel the editing.
                if (27 === key) {
                    buttons.children('.cancel').click();
                }
            }).keyup(function() {
                real_slug.val(this.value);
            }).focus();

        },

        movePreview: function() {

            var $field = this.checkField($('#preview-action'));

            if (!$field) {
                return;
            }

            this.checkMiscActions();

        },

        moveRevisions: function() {

            var $field = this.checkField($('.misc-pub-revisions'));

            if (!$field) {
                return;
            }

            this.checkMiscActions();

        },

        moveRevisionsList: function() {

            var $field = this.checkField($('#revisionsdiv > .inside'));

            if (!$field) {
                return;
            }

            $('#revisionsdiv').remove();
            $('.metabox-prefs > label[for="revisionsdiv-hide"]').remove();

        },

        moveStatus: function() {

            var $field = this.checkField($('.misc-pub-post-status'));

            if (!$field) {
                return;
            }

            this.checkMiscActions();

        },

        moveTaxonomy: function() {

            if (this.get('taxonomyHierarchical')) {
                this.loadMoveTaxonomy();
            } else {
                this.addAction('load', this.loadMoveTaxonomy);
            }

        },

        loadMoveTaxonomy: function() {

            var selector = this.get('taxonomySelector');
            var $field = this.checkField($('#' + selector + ' > .inside'));

            if (!$field) {
                return;
            }

            $field.attr('id', selector);

            $('#' + selector).remove();
            $('.metabox-prefs > label[for="' + selector + '-hide"]').remove();

        },

        moveTitle: function() {

            this.checkField($('#titlediv > #titlewrap > #title'));

        },

        moveTrackbacks: function() {

            var $field = this.checkField($('#trackbacksdiv > .inside'));

            if (!$field) {
                return;
            }

            $('#trackbacksdiv').remove();
            $('.metabox-prefs > label[for="trackbacksdiv-hide"]').remove();

        },

        moveVisibility: function() {

            var $field = this.checkField($('.misc-pub-visibility'));

            if (!$field) {
                return;
            }

            this.checkMiscActions();

        }

    });

    acf.registerFieldType(Post_Field);

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Post Object: Add Post
     */
    var AddPost = acfe.FieldExtender({

        id: 'post_object_add_post',

        type: 'post_object',

        dependencies: ['relationship_modal'],

        condition: function() {
            return this.has('acfeAddPost');
        },

        events: {
            'click a.add-post': 'onAddPost',
        },

        onAddPost: function(e, $el) {

            // prevent default
            e.preventDefault();

            // single post types
            if ($el.attr('href') !== '#') {

                this.newModal($el.attr('href'));

                // multiple post type
            } else {

                // confirm tooltip
                new acfe.RelationshipConfirm({
                    target: $el,
                    targetConfirm: false,
                    text: this.$('.acfe-relationship-popup:last').html(),
                    context: this,
                    confirm: function(e, $el) {
                        this.newModal($el.attr('href'));
                    }
                });

            }

        },

    });


    /**
     * Post Object: Edit Post
     */
    var EditPost = acfe.FieldExtender({

        id: 'post_object_edit_post',

        type: 'post_object',

        dependencies: ['relationship_modal'],

        condition: function() {
            return this.has('acfeEditPost');
        },

        events: {
            'click a.edit-post': 'onEditPost',
        },

        initialize: function() {

            this.getParent(EditPost).initialize.apply(this, arguments);

            // add action on select2
            this.select2.on('select2:selecting', this.proxy(this.onSelecting));

        },

        onSelecting: function(e) {

            var $el = $(e.params.args.originalEvent.target);

            if ($el.hasClass('edit-post')) {
                this.onEditPost(e, $el);
            }

        },

        onEditPost: function(e, $el) {

            // close selection
            this.select2.$el.select2('close');

            // prevent default
            e.preventDefault();
            e.stopPropagation();

            // check id
            if ($el.data('id')) {

                // construct url
                var url = acfe.addQueryArgs(acf.get('admin_url') + 'post.php', {
                    post: $el.data('id'),
                    action: 'edit'
                });

                // modal
                this.newModal(url, 'edit');

            }

        },

    });


    /**
     * Post Obect: Select2 Template Selection
     *
     * @type {acf.Model}
     */
    var templateSelection = new acf.Model({

        filters: {
            'select2_template_selection/type=post_object': 'select2TemplateSelection',
            'select2_template_result/type=post_object': 'select2TemplateSelection',
        },

        select2TemplateSelection: function(text, selection, $select, fieldData, field, instance) {

            // check setting
            // check selection.id is numeric (due to post object 'post creation' being post names)
            if (field.has('acfeEditPost') && acf.isNumeric(selection.id)) {
                return text + ' <a href="#" class="acf-icon -pencil small grey edit-post" data-id="' + selection.id + '"></a>';
            }

            return text;

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Relationship: Add Post
     */
    var AddPost = acfe.FieldExtender({

        id: 'relationship_add_post',

        dependencies: ['relationship_modal'],

        type: 'relationship',

        condition: function() {
            return this.has('acfeAddPost');
        },

        events: {
            'click a.add-post': 'onAddPost',
        },

        setup: function() {

            this.$('.filters').addClass('-add-post');
            this.$('.filters').append(this.$('.filter.-add-post'));

        },

        onAddPost: function(e, $el) {

            // prevent dault
            e.preventDefault();

            // multiple post types
            if ($el.attr('href') !== '#') {

                this.newModal($el.attr('href'));

                // multiple post type
            } else {

                // confirm tooltip
                new acfe.RelationshipConfirm({
                    target: $el,
                    targetConfirm: false,
                    text: this.$('.acfe-relationship-popup:last').html(),
                    context: this,
                    confirm: function(e, $el) {
                        this.newModal($el.attr('href'));
                    }
                });

            }

        },

    });


    /**
     * Relationship: Edit Post
     */
    var EditPost = acfe.FieldExtender({

        id: 'relationship_edit_post',

        dependencies: ['relationship_modal'],

        type: 'relationship',

        condition: function() {
            return this.has('acfeEditPost');
        },

        events: {
            'click a.edit-post': 'onEditPost',
        },

        setup: function() {

            this.$listItems('values').append('<a href="#" class="acf-icon -pencil small dark edit-post"></a>');

        },

        onEditPost: function(e, $el) {

            // prevent default
            e.preventDefault();
            e.stopPropagation();

            // vars
            var id = $el.closest('span').attr('data-id');
            var url = acfe.addQueryArgs(acf.get('admin_url') + 'post.php', {
                post: id,
                action: 'edit'
            });

            // modal
            this.newModal(url, 'edit');

        },

        newValue: function(props) {

            // parent newValue
            var value = this.getParent(EditPost).newValue.apply(this, arguments);

            var $html = $('<div>' + value + '</div>');

            $html.find('.-pencil').remove();
            $html.find('span').append('<a href="#" class="acf-icon -pencil small dark edit-post"></a>');

            return $html.html();

        },

        walkChoices: function(data) {

            // parent walkChoices
            var choices = this.getParent(EditPost).walkChoices.apply(this, arguments);

            var $html = $('<div>' + choices + '</div>');

            $html.find('.acf-rel-item').append('<a href="#" class="acf-icon -pencil small grey edit-post"></a>');

            return $html.html();

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Relationship: Modal
     */
    var FieldModal = acfe.FieldExtender({

        id: 'relationship_modal',

        type: ['relationship', 'post_object'],

        condition: function() {
            return this.has('acfeAddPost') || this.has('acfeEditPost');
        },

        newModal: function(url, relation = 'add') {

            new acfe.RelationshipModal({
                field: this,
                url: url,
                relation: relation
            });

        },

    });

    /**
     * Relationship: Callbacks
     */
    new acf.Model({

        actions: {
            'acfe/relationship/add_post': 'addPost',
            'acfe/relationship/edit_post': 'editPost',
        },

        getFieldByCid: function(cid) {

            // post object
            return acf.getFields({
                    type: 'post_object'
                })

                // relationship
                .concat(acf.getFields({
                    type: 'relationship'
                }))

                // filter
                .filter(function(field) {
                    return field.cid === cid;
                })

                // shift
                .shift();

        },

        addPost: function(cid, pid, title) {

            // validate
            var field = this.getFieldByCid(cid);
            if (!field) {
                return;
            }

            // switch field type
            switch (field.get('type')) {

                // post object
                case 'post_object': {

                    // add option
                    field.select2.addOption({
                        id: pid,
                        text: title,
                        selected: true,
                    }).trigger('change');

                    // close popup
                    acfe.closeModal();

                    break;
                }

                // relationship
                case 'relationship': {

                    // success: add item
                    var onSuccess = function(html) {
                        if (html) {
                            this.onClickAdd('', $(html));
                        }
                    };

                    // complete: refresh list
                    var onComplete = function(html) {
                        this.fetch();
                    };

                    // ajax request
                    $.ajax({
                        url: acf.get('ajaxurl'),
                        dataType: 'html',
                        type: 'post',
                        data: acf.prepareForAjax({
                            action: 'acfe/relationship/add_post',
                            pid: pid,
                            field_key: field.get('key'),
                        }),
                        context: field,
                        success: onSuccess,
                        complete: onComplete,
                    });

                    // close popup
                    acfe.closeModal();

                    break;
                }

            }

        },

        editPost: function(cid, pid, title) {

            // validate
            var field = this.getFieldByCid(cid);
            if (!field) {
                return;
            }

            // switch field type
            switch (field.get('type')) {

                // post object
                case 'post_object': {

                    // get values
                    var values = field.select2.$el.select2('data');

                    // loop
                    for (var [k, row] of values.entries()) {
                        if (row.id === pid) {

                            // replace text
                            values[k]['text'] = title;
                            break;

                        }
                    }

                    // trigger change
                    field.select2.$el.trigger('change');

                    // close popup
                    acfe.closeModal();

                    break;
                }

                // relationship
                case 'relationship': {

                    // find pid in values
                    var $values = field.$listItem('values', pid);

                    // no values, just refresh the list
                    if (!$values.length) {

                        // refresh list
                        field.fetch();

                    } else {

                        // success: replace item
                        var onSuccess = function(html) {

                            if (html) {

                                // create item
                                var newItem = this.newValue({
                                    id: pid,
                                    text: html
                                });

                                // replace
                                $values.parent().replaceWith(newItem);

                                // trigger change
                                this.$input().trigger('change');

                            }

                        };

                        // complete: refresh list
                        var onComplete = function(html) {
                            this.fetch();
                        };

                        // Ajax: Request
                        $.ajax({
                            url: acf.get('ajaxurl'),
                            dataType: 'html',
                            type: 'post',
                            data: acf.prepareForAjax({
                                action: 'acfe/relationship/add_post',
                                pid: pid,
                                field_key: field.get('key'),
                            }),
                            context: field,
                            success: onSuccess,
                            complete: onComplete,
                        });

                    }

                    // close popup
                    acfe.closeModal();

                    break;

                }

            }

        },

    });


    /**
     * Relationship Modal
     */
    acfe.RelationshipModal = acf.Model.extend({

        data: {
            field: false,
            url: false,
            relation: 'add'
        },

        setup: function(props) {

            $.extend(this.data, props);

        },

        initialize: function() {

            var relation = this.get('relation');
            var field = this.get('field');
            var isAdmin = acfe.get('is_admin') ? 1 : 0;
            var postid = acf.get('post_id');

            var url = acfe.addQueryArgs(this.get('url'), {
                acfe_relation_type: relation,
                acfe_relation_field_cid: field.cid,
                acfe_relation_field_key: field.get('key'),
                acfe_relation_field_name: field.get('name'),
                acfe_relation_post_id: postid,
                acfe_relation_is_admin: isAdmin,
            });

            var title = this.get('field').$labelWrap().find('>label').text() || this.get('relation');

            // Open
            acfe.newModal({
                title: title,
                class: '-iframe',
                content: '<iframe src="' + url + '" />',
                size: 'xlarge',
                destroy: true
            });

        }

    });


    /**
     * Relationship Confirm
     */
    acfe.RelationshipConfirm = acf.models.TooltipConfirm.extend({

        events: {
            'click a': 'onConfirm',
        },

        render: function() {

            // set HTML
            this.html(this.get('text'));

            // add class
            this.$el.addClass('acf-fc-popup');

        }

    });


    /**
     * Relationship Iframe
     */
    var RelationshipIframe = acf.Model.extend({

        wait: 'prepare',

        data: {
            acfe_relation_type: false,
            acfe_relation_field_cid: false,
            acfe_relation_field_key: false,
            acfe_relation_field_name: false,
            acfe_relation_post_id: false,
            acfe_relation_is_admin: false,
        },

        getPostID: function() {

            var $input = $('form#post input[name="post_ID"]');

            if ($input.length !== 1 || $input.val() === '') {
                return false;
            }

            return $input.val();

        },

        getPostTitle: function() {

            var $input = $('form#post input[name="post_title"]');

            if ($input.length !== 1 || $input.val() === '') {
                return false;
            }

            return $input.val();

        },

        isGutenberg: function() {
            return $('body').hasClass('block-editor-page') && typeof wp !== 'undefined' && typeof wp.blocks !== 'undefined';
        },

        setup: function(props) {

            var data = acfe.getQueryArgs(window.parent.window.jQuery('body .acfe-modal.-iframe iframe').attr('src'));

            // data
            $.extend(this.data, data);

            // hide wp navbar
            $('html').addClass('acfe-hide-wp');

        },

        initialize: function() {

            var self = this;

            // gutenberg
            if (this.isGutenberg()) {

                var unsubscribe = wp.data.subscribe(function() {

                    var notices = wp.data.select('core/notices').getNotices();

                    if (notices.length && notices[0].id === 'SAVE_POST_NOTICE_ID' && notices[0].status === 'success') {

                        var select = wp.data.select('core/editor');

                        var postID = select.getCurrentPostId();
                        var postTitle = select.getEditedPostAttribute('title');

                        self.saveGutenberg(postID, postTitle);
                        unsubscribe();

                    }

                });


                // classic editor: Post
            } else if (acfe.getCurrentFilename() === 'post.php') {

                // Validate edit
                if (this.get('acfe_relation_type') === 'edit' && !$('.updated.notice.notice-success').length) {
                    return;
                }

                window.parent.acf.doAction('acfe/relationship/' + this.get('acfe_relation_type') + '_post', this.get('acfe_relation_field_cid'), this.getPostID(), this.getPostTitle());

                // classic: Media New
            } else if (acfe.getCurrentFilename() === 'media-new.php') {

                $('body').on('DOMSubtreeModified', '#media-items', function() {

                    var $attachment = $('body').find('#media-items > .media-item > a.edit-attachment');

                    if ($attachment.length) {

                        var attachmentTitle = $attachment.parent().find('> .filename > .title').text();
                        var attachmentURL = $attachment.attr('href');
                        var attachmentData = acfe.getQueryArgs(attachmentURL);

                        if (attachmentData.post) {
                            window.parent.acf.doAction('acfe/relationship/' + self.get('acfe_relation_type') + '_post', self.get('acfe_relation_field_cid'), attachmentData.post, attachmentTitle);
                        }

                    }

                });

            }

        },

        saveGutenberg: function(postID, postTitle) {

            var self = this;

            // dirty but didn't find another solution
            setInterval(function() {
                window.parent.acf.doAction('acfe/relationship/' + self.get('acfe_relation_type') + '_post', self.get('acfe_relation_field_cid'), postID, postTitle);
            }, 1500);

        }

    });

    // check if inside an iframe
    if (typeof window.parent !== 'undefined' && window.parent.window !== window && typeof window.parent.window.jQuery !== 'undefined' && parent.window.jQuery('body .acfe-modal iframe').length) {
        new RelationshipIframe();
    }

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Block Types
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_block_types');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_block_types');
    acf.registerConditionForFieldType('patternMatch', 'acfe_block_types');
    acf.registerConditionForFieldType('contains', 'acfe_block_types');
    acf.registerConditionForFieldType('hasValue', 'acfe_block_types');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_block_types');

    /**
     * Color Picker
     */
    acf.registerConditionForFieldType('equalTo', 'color_picker');
    acf.registerConditionForFieldType('notEqualTo', 'color_picker');
    acf.registerConditionForFieldType('patternMatch', 'color_picker');
    acf.registerConditionForFieldType('contains', 'color_picker');

    /**
     * Countries
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_countries');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_countries');
    acf.registerConditionForFieldType('patternMatch', 'acfe_countries');
    acf.registerConditionForFieldType('contains', 'acfe_countries');
    acf.registerConditionForFieldType('hasValue', 'acfe_countries');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_countries');

    /**
     * Currencies
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_currencies');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_currencies');
    acf.registerConditionForFieldType('patternMatch', 'acfe_currencies');
    acf.registerConditionForFieldType('contains', 'acfe_currencies');
    acf.registerConditionForFieldType('hasValue', 'acfe_currencies');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_currencies');

    /**
     * Date Range Picker
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_date_range_picker');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_date_range_picker');
    acf.registerConditionForFieldType('patternMatch', 'acfe_date_range_picker');
    acf.registerConditionForFieldType('contains', 'acfe_date_range_picker');
    acf.registerConditionForFieldType('hasValue', 'acfe_date_range_picker');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_date_range_picker');

    /**
     * Field Groups
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_field_groups');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_field_groups');
    acf.registerConditionForFieldType('patternMatch', 'acfe_field_groups');
    acf.registerConditionForFieldType('contains', 'acfe_field_groups');
    acf.registerConditionForFieldType('hasValue', 'acfe_field_groups');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_field_groups');

    /**
     * Field Types
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_field_types');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_field_types');
    acf.registerConditionForFieldType('patternMatch', 'acfe_field_types');
    acf.registerConditionForFieldType('contains', 'acfe_field_types');
    acf.registerConditionForFieldType('hasValue', 'acfe_field_types');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_field_types');

    /**
     * Fields
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_fields');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_fields');
    acf.registerConditionForFieldType('patternMatch', 'acfe_fields');
    acf.registerConditionForFieldType('contains', 'acfe_fields');
    acf.registerConditionForFieldType('hasValue', 'acfe_fields');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_fields');

    /**
     * Image Selector
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_image_selector');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_image_selector');
    acf.registerConditionForFieldType('patternMatch', 'acfe_image_selector');
    acf.registerConditionForFieldType('contains', 'acfe_image_selector');
    acf.registerConditionForFieldType('hasValue', 'acfe_image_selector');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_image_selector');

    /**
     * Image Sizes
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_image_sizes');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_image_sizes');
    acf.registerConditionForFieldType('patternMatch', 'acfe_image_sizes');
    acf.registerConditionForFieldType('contains', 'acfe_image_sizes');
    acf.registerConditionForFieldType('hasValue', 'acfe_image_sizes');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_image_sizes');

    /**
     * Languages
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_languages');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_languages');
    acf.registerConditionForFieldType('patternMatch', 'acfe_languages');
    acf.registerConditionForFieldType('contains', 'acfe_languages');
    acf.registerConditionForFieldType('hasValue', 'acfe_languages');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_languages');

    /**
     * Menu Locations
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_menu_locations');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_menu_locations');
    acf.registerConditionForFieldType('patternMatch', 'acfe_menu_locations');
    acf.registerConditionForFieldType('contains', 'acfe_menu_locations');
    acf.registerConditionForFieldType('hasValue', 'acfe_menu_locations');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_menu_locations');

    /**
     * Menus
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_menus');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_menus');
    acf.registerConditionForFieldType('patternMatch', 'acfe_menus');
    acf.registerConditionForFieldType('contains', 'acfe_menus');
    acf.registerConditionForFieldType('hasValue', 'acfe_menus');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_menus');

    /**
     * Options Pages
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_options_pages');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_options_pages');
    acf.registerConditionForFieldType('patternMatch', 'acfe_options_pages');
    acf.registerConditionForFieldType('contains', 'acfe_options_pages');
    acf.registerConditionForFieldType('hasValue', 'acfe_options_pages');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_options_pages');

    /**
     * Payment Cart
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_payment_cart');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_payment_cart');
    acf.registerConditionForFieldType('patternMatch', 'acfe_payment_cart');
    acf.registerConditionForFieldType('contains', 'acfe_payment_cart');
    acf.registerConditionForFieldType('hasValue', 'acfe_payment_cart');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_payment_cart');

    /**
     * Payment Selector
     */

    acf.registerConditionForFieldType('equalTo', 'acfe_payment_selector');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_payment_selector');
    acf.registerConditionForFieldType('patternMatch', 'acfe_payment_selector');
    acf.registerConditionForFieldType('contains', 'acfe_payment_selector');
    acf.registerConditionForFieldType('hasValue', 'acfe_payment_selector');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_payment_selector');

    acf.registerConditionForFieldType('equalTo', 'acfe_payment_selector_radio');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_payment_selector_radio');
    acf.registerConditionForFieldType('patternMatch', 'acfe_payment_selector_radio');
    acf.registerConditionForFieldType('contains', 'acfe_payment_selector_radio');
    acf.registerConditionForFieldType('hasValue', 'acfe_payment_selector_radio');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_payment_selector_radio');

    acf.registerConditionForFieldType('equalTo', 'acfe_payment_selector_select');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_payment_selector_select');
    acf.registerConditionForFieldType('patternMatch', 'acfe_payment_selector_select');
    acf.registerConditionForFieldType('contains', 'acfe_payment_selector_select');
    acf.registerConditionForFieldType('hasValue', 'acfe_payment_selector_select');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_payment_selector_select');

    /**
     * Templates
     */
    acf.registerConditionForFieldType('equalTo', 'acfe_templates');
    acf.registerConditionForFieldType('notEqualTo', 'acfe_templates');
    acf.registerConditionForFieldType('patternMatch', 'acfe_templates');
    acf.registerConditionForFieldType('contains', 'acfe_templates');
    acf.registerConditionForFieldType('hasValue', 'acfe_templates');
    acf.registerConditionForFieldType('hasNoValue', 'acfe_templates');

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field Group Field Value Condition
     */
    new acf.Model({

        actions: {
            'new_field/type=acfe_field_group_condition': 'newPostbox',
            'show_field/type=acfe_field_group_condition': 'showPostbox',
            'hide_field/type=acfe_field_group_condition': 'hidePostbox',
        },

        getFieldPostbox: function(field) {
            return acf.getPostbox(field.$el.closest('.acf-postbox'));
        },

        newPostbox: function(field) {

            var postbox = this.getFieldPostbox(field);

            // if postbox hidden by screen options but should be displayed by global condition
            if (postbox && postbox.$el.hasClass('hide-if-js') && field.getConditions().calculate()) {

                // force show & enable
                postbox.$el.removeClass('hide-if-js');
                postbox.showEnable();

            }


        },

        showPostbox: function(field) {

            var postbox = this.getFieldPostbox(field);

            // postbox
            if (postbox) {

                // if postbox hidden by screen options force show enable
                postbox.$el.removeClass('hide-if-js');
                postbox.showEnable();

                // term & user table
            } else {

                var $formTable = field.$el.closest('.form-table');

                $formTable.show();
                $formTable.prev('h2').show();

                acf.enable($formTable, 'postbox');

            }

        },

        hidePostbox: function(field) {

            var postbox = this.getFieldPostbox(field);

            // postbox
            if (postbox) {

                postbox.hideDisable();

                // term & user table
            } else {

                var $formTable = field.$el.closest('.form-table');

                $formTable.hide();
                $formTable.prev('h2').hide();

                acf.disable($formTable, 'postbox');

            }

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: Instructions
     */
    new acf.Model({

        priority: 15,

        field: false,

        placement: false,

        actions: {
            'new_field': 'newField',
        },

        newField: function(field) {

            this.field = field;

            if (field.has('instructionMore')) {
                this.readMore();
            }

        },

        readMore: function() {

            var $instruction = this.$getInstruction();

            if (!$instruction) {
                return;
            }

            // Special rule for tooltip
            if (this.placement === 'tooltip') {

                var text = $instruction.attr('title');

                text = text.replaceAll(/---(.*)---/g, '');
                text = text.replaceAll('---', '');

                $instruction.attr('title', text);
                return;

            }

            var text = $instruction.html();
            var more = acf.__('Read more');
            var rule = /---(.*)---/g;

            // Custom Link Text
            if (rule.test(text)) {

                more = text.match(rule)[0];
                more = more.replaceAll('---', '');

                text = text.replaceAll(rule, '---');

            }

            // Instructions Text
            if (text.indexOf('---') > -1) {

                var split = text.split('---');
                var first = split.shift();
                var rest = split.join('');

                $instruction.html(first + ' <a href="#" data-name="read-more">' + more + '</a>' + '<span class="more">' + rest + '</span>');

                $instruction.on('click', '[data-name="read-more"]', function(e) {
                    e.preventDefault();
                    this.remove();
                    $instruction.find('>.more').show();
                });

            }

        },

        getPlacement: function() {

            var placement = false;

            if (this.field.$labelWrap().find('>.description').length)
                placement = 'label';

            else if (this.field.$inputWrap().find('>.description:first-child').length)
                placement = 'above_field';

            else if (this.field.$inputWrap().find('>.description:last-child').length)
                placement = 'field';

            else if (this.field.$labelWrap().find('>.acfe-field-tooltip').length)
                placement = 'tooltip';

            this.placement = placement;

            return this.placement;

        },

        $getInstruction: function() {

            switch (this.getPlacement()) {

                case 'label': {
                    return this.field.$labelWrap().find('>.description');
                }

                case 'above_field': {
                    return this.field.$inputWrap().find('>.description:first-child');
                }

                case 'field': {
                    return this.field.$inputWrap().find('>.description:last-child');
                }

                case 'tooltip': {
                    return this.field.$labelWrap().find('>.acfe-field-tooltip');
                }

            }

            return false;

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    /**
     * Field: WYSIWYG
     */
    new acf.Model({

        actions: {
            'new_field/type=wysiwyg': 'newEditor',
            'wysiwyg_tinymce_init': 'editorInit',
        },

        filters: {
            'wysiwyg_tinymce_settings': 'editorSettings',
        },

        newEditor: function(field) {

            var height;

            // AutoResize
            if (field.has('acfeWysiwygAutoresize') && field.has('acfeWysiwygMinHeight')) {

                height = field.get('acfeWysiwygMinHeight');

                if (height < 80)
                    height = 80;

                field.$input().css('height', height);

                // Height
            } else if (field.has('acfeWysiwygHeight')) {

                height = field.get('acfeWysiwygHeight');

                if (height < 80)
                    height = 80;

                field.$input().css('height', height);

            }

        },

        editorSettings: function(init, id, field) {

            // AutoResize
            if (field.has('acfeWysiwygAutoresize')) {

                init.wp_autoresize_on = true;

                if (field.has('acfeWysiwygMinHeight')) {
                    init.autoresize_min_height = field.get('acfeWysiwygMinHeight');
                }

                if (field.has('acfeWysiwygMaxHeight')) {

                    if (!field.has('acfeWysiwygMinHeight')) {
                        init.autoresize_min_height = field.get('acfeWysiwygMaxHeight');
                    }

                    init.autoresize_max_height = field.get('acfeWysiwygMaxHeight');
                }

                // Height
            } else if (field.has('acfeWysiwygHeight')) {

                var height = field.get('acfeWysiwygHeight');

                init.min_height = height;
                init.height = height;

            }

            // Valid Elements
            if (field.has('acfeWysiwygValidElements')) {

                init.valid_elements = field.get('acfeWysiwygValidElements');

            }

            // Remove Path
            if (field.has('acfeWysiwygRemovePath')) {

                init.elementpath = false;

            }

            // Disable Resize
            if (field.has('acfeWysiwygDisableResize')) {

                init.resize = false;

            }

            // Status Bar
            if (field.has('acfeWysiwygRemovePath') && field.has('acfeWysiwygDisableResize')) {

                init.statusbar = false;

            }

            // Menu Bar
            if (field.has('acfeWysiwygMenubar')) {

                init.menubar = true;

            }

            // Custom toolbar
            if (field.has('acfeWysiwygCustomToolbar') && field.has('acfeWysiwygCustomToolbarButtons')) {

                var buttons = field.get('acfeWysiwygCustomToolbarButtons');

                init.toolbar1 = buttons[1].join(',');
                init.toolbar2 = buttons[2].join(',');
                init.toolbar3 = buttons[3].join(',');
                init.toolbar4 = buttons[4].join(',');

            }

            // Merge Toolbar
            if (field.has('acfeWysiwygMergeToolbar')) {

                if (init.toolbar2)
                    init.toolbar1 += ',' + init.toolbar2;

                if (init.toolbar3)
                    init.toolbar1 += ',' + init.toolbar3;

                if (init.toolbar4)
                    init.toolbar1 += ',' + init.toolbar4;

                init.toolbar2 = '';
                init.toolbar3 = '';
                init.toolbar4 = '';

            }

            if (field.has('acfeWysiwygToolbarSourceCode') || field.has('acfeWysiwygToolbarWpMedia')) {

                init.toolbar1 += ',|';

                // Source Code
                if (field.has('acfeWysiwygToolbarSourceCode')) {

                    init.toolbar1 += ',source_code';

                }

                // WP Media
                if (field.has('acfeWysiwygToolbarWpMedia')) {

                    init.toolbar1 += ',wp_add_media';

                }

            }

            // Disable WP Style
            if (field.has('acfeWysiwygDisableWpStyle')) {

                var styles = init.content_css;
                styles = styles.split(',');

                styles = styles.filter(function(style) {
                    return !style.match('/wp-includes/');
                });

                styles = styles.join(',');

                init.content_css = styles;

                init.init_instance_callback = function(editor) {

                    var doc = editor.getDoc();
                    var styles = doc.getElementsByTagName('link');

                    for (var i = 0; i < styles.length; i++) {
                        if (styles[i].href.indexOf('skins/lightgray/content.min.css') !== -1) {
                            styles[i].remove();
                        }
                    }

                };

            }

            // Custom Style
            if (field.has('acfeWysiwygCustomStyle')) {

                var styles = field.get('acfeWysiwygCustomStyle');
                styles = styles.join(',');

                if (init.content_css.length) {
                    styles = init.content_css + ',' + styles;
                }

                init.content_css = styles;

            }

            return init;

        },

        editorInit: function(editor, editor_id, init, field) {

            if (field.has('acfeWysiwygHeight')) {

                var height = field.get('acfeWysiwygHeight');

                field.$el.find('iframe').css({
                    'min-height': height,
                    'height': height
                });

            }

        }

    });

})(jQuery);