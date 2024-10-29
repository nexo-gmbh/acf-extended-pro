(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    new acf.Model({

        wait: 'prepare',

        events: {
            'click .acfe-dev-edit-meta': 'onEdit',
        },

        onEdit: function(e, $el) {

            e.preventDefault();

            var $tr = $el.closest('tr');

            var id = $el.attr('data-meta-id');
            var key = $el.attr('data-meta-key');
            var type = $el.attr('data-meta-type');
            var nonce = $el.attr('data-nonce');

            $.ajax({
                url: acf.get('ajaxurl'),
                type: 'post',
                data: {
                    action: 'acfe/dev/edit_meta',
                    id: id,
                    key: key,
                    type: type,
                    _wpnonce: nonce,
                },
                success: function(response) {

                    if (response === '0' || response === '-1') {
                        return;
                    }

                    acfe.newModal({
                        title: 'Edit Meta',
                        size: 'medium',
                        destroy: true,

                        events: {
                            'click .acfe-modal-footer a.update': 'onUpdate',
                        },

                        content: response,

                        footer: function() {
                            return '<button class="button close">' + acf.__('Cancel') + '</button> <a class="button button-primary update">' + acf.__('Update') + '</a>';
                        },

                        onUpdate: function(e, $el) {

                            // prevent default
                            e.preventDefault();

                            if (!this.$('form')[0].reportValidity()) {
                                return;
                            }

                            // serialize data
                            var data = acf.serialize(this.$content());

                            // close modal
                            this.close();

                            $.ajax({
                                url: acf.get('ajaxurl'),
                                type: 'post',
                                data: {
                                    action: 'acfe/dev/update_meta',
                                    id: id,
                                    key: key,
                                    type: type,
                                    data: data,
                                    _wpnonce: nonce,
                                },
                                success: function(response) {

                                    if (response !== '0') {

                                        $tr.addClass('updated').delay(350).queue(function() {
                                            $(this).removeClass('updated').dequeue();
                                        });

                                        $tr.find('td.col-name strong').text(data.name);
                                        $tr.find('td.col-value').html(response);

                                    }

                                }
                            });

                        },
                    });

                }
            });

        }

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    var moduleManager = new acf.Model({
        wait: 'prepare',
        priority: 1,
        initialize: function() {
            if (acfe.get('module')) {
                new module(acfe.get('module'));
            }
        }
    });

    var module = acf.Model.extend({

        events: {
            'click a[data-event="review-sync"]': 'onClickReview',
        },

        actions: {
            'validation_success': 'onValidationSuccess',
        },

        setup: function(props) {
            this.inherit(props);
        },

        onValidationSuccess: function($form, validator) {

            if (this.get('screen') === 'post') {

                // todo: use acfe.get() to check if sync is available instead
                var $reviewSync = $('[data-event="review-sync"]');

                if ($reviewSync.length) {

                    // todo: localize text
                    if (!confirm('Local json file is different from the version in database.' + "\n" + 'Do you want to replace the local file with the current settings?')) {
                        this.preventSubmit($form, validator);
                    }
                }

            }

        },

        preventSubmit: function($form, validator) {

            var preventDefault = function(e) {
                e.preventDefault();
            }

            $form.on('submit', preventDefault);

            this.setTimeout(function() {
                $form.off('submit', preventDefault);
                validator.reset();
            }, 50);

        },

        onClickReview: function(e, $el) {

            e.preventDefault();
            this.reviewSync($el.data());

        },

        reviewSync: function(props) {

            var title = acf.__('Review local changes');

            var modal = acf.newModal({
                title: title,
                content: '<p class="acf-modal-feedback"><i class="acf-loading"></i> ' + acf.__('Loading diff') + '</p>',
                //toolbar: '<a href="' + props.href + '" class="button button-primary button-sync-changes disabled">' + acf.__('Sync changes') + '</a>',
            });

            // call ajax
            var xhr = $.ajax({
                    url: acf.get('ajaxurl'),
                    method: 'POST',
                    dataType: 'json',
                    data: acf.prepareForAjax({
                        action: 'acfe/ajax/module_local_diff',
                        module: props.module,
                        id: props.id,
                        _nonce: props.nonce,
                    })
                })
                .done(function(data, textStatus, jqXHR) {
                    modal.content(data.content);
                    modal.toolbar(data.toolbar);
                    //modal.$('.button-sync-changes').removeClass('disabled');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    if (error = acf.getXhrError(jqXHR)) {
                        modal.content('<p class="acf-modal-feedback error">' + error + '</p>');
                    }
                });

        }

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    var moduleManager = new acf.Model({
        wait: 'prepare',
        priority: 1,
        initialize: function() {
            if (acf.get('screen') === 'acfe_rewrite_rules') {
                new module();
            }
        }
    });

    var module = acf.Model.extend({

        data: {
            'firstMatch': null,
            'rewriteRules': {},
        },

        events: {
            'mouseover span.regex-repeater': 'hoverRepeater',
            'mouseout span.regex-repeater': 'hoverRepeater',
            'mouseover span.regexgroup,span.regexgroup-target': 'hoverRegex',
            'mouseout span.regexgroup,span.regexgroup-target': 'hoverRegex',
            'keyup #acfe-rewrite-rules-url': 'onSearch',
            'click #acfe-rewrite-rules-clear': 'onClear',
        },

        hoverRepeater: function(e, $el) {

            // Highlight the target of a repeater
            $el.parent().toggleClass('highlight');

        },

        hoverRegex: function(e, $el) {

            var id = $el[0].id;
            if (id.substr(-7) === '-target') {
                id = id.substr(0, id.length - 7);
            }

            // Highlight corresponding regex groups and their targets in the "Substitution" column
            $('#' + id + ', #' + id + '-target').toggleClass('highlight');

        },

        onSearch: function(e, $el) {

            var url = $el.val();

            // Empty box, show all rules
            if (url === '') {
                $('.rewrite-rule-line').removeClass('rewrite-rule-matched rewrite-rule-matched-first rewrite-rule-unmatched');
                return;
            }

            var matchedRules = {};
            var isFirst = true;
            var rewrite_rules = this.get('rewriteRules');

            for (var idx in rewrite_rules) {

                var result = rewrite_rules[idx].exec(url);

                if (result) {

                    // If it is a match, show it
                    matchedRules[idx] = result;
                    var elRule = $('#rewrite-rule-' + idx).addClass('rewrite-rule-matched').removeClass('rewrite-rule-unmatched');

                    // Fill in the corresponding query values
                    for (var rIdx = 0; rIdx < result.length; rIdx++) {
                        $('#regex-' + idx + '-group-' + rIdx + '-target-value').html(result[rIdx] || '');
                    }

                    if (isFirst) {

                        // If it is the first match, highlight it
                        elRule.addClass('rewrite-rule-matched-first');
                        isFirst = false;

                        // The previous first match is not longer the first match
                        if (this.get('firstMatch') !== idx) {
                            $('#rewrite-rule-' + this.get('firstMatch')).removeClass('rewrite-rule-matched-first');
                            this.set('firstMatch', idx);
                        }

                    }

                } else {

                    // If it is not a match, hide it
                    $('#rewrite-rule-' + idx).removeClass('rewrite-rule-matched').addClass('rewrite-rule-unmatched');

                }

            }

        },

        onClear: function(e, $el) {

            e.preventDefault();
            $('#acfe-rewrite-rules-url').val('');
            $('.rewrite-rule-line').removeClass('rewrite-rule-matched rewrite-rule-matched-first rewrite-rule-unmatched');

        },

        setup: function(props) {

            // get rewrite rules
            var rewrite_rules = acf.get('rewrite_rules');

            // Compile all regexes
            for (var idx in rewrite_rules) {

                var pattern = rewrite_rules[idx];

                // Fix double backslash \\
                pattern = pattern.replace(/\\\\/g, '\\');

                // Add ^ if doesn't exists
                pattern = pattern.substring(0, 1) !== '^' ? '^' + pattern : pattern;

                // Add rules
                rewrite_rules[idx] = new RegExp('^' + pattern);

            }

            this.set('rewriteRules', rewrite_rules);

        },

        initialize: function() {

            // disable window unload
            acf.unload.disable();

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    var moduleManager = new acf.Model({
        wait: 'prepare',
        priority: 1,
        initialize: function() {
            if ($('body').hasClass('acfe-screen-layouts') && acfe.inArray(acfe.getCurrentFilename(), ['post.php', 'post-new.php'])) {
                new module();
            }
        }
    });

    var module = acf.Model.extend({

        initialize: function() {

            var column = $('.columns-prefs input:checked').val();

            if (column && column !== '1' && column !== '2') {
                $('#post-body.metabox-holder').removeClass('columns-2').addClass('columns-' + column);
            }

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    var moduleManager = new acf.Model({
        wait: 'prepare',
        priority: 1,
        initialize: function() {
            if (acf.get('screen') === 'acfe_scripts') {
                new module();
            }
        }
    });

    var module = acf.Model.extend({

        i: -1,
        xhr: false,
        timer: false,
        stats: false,
        paused: false,
        confirmed: false,
        restart: false,

        data: {
            script: false,
            run: false,
        },

        scriptData: {},

        scriptStats: {},

        $events: function() {
            return $('#events .events');
        },

        $eventType: function(type) {
            return this.$events().find('> .event[data-type="' + type + '"]');
        },

        $eventStatus: function(status) {
            return this.$events().find('> .event[data-status="' + status + '"]');
        },

        events: {
            'click #start': 'onStart',
            'click #stop': 'onStop',
            'click #pause': 'onPause',
            'click #clear': 'onClear',
            'click #tail': 'onTail',
            'click .filter': 'onFilter',
            'click [name="acf[confirm]"]': 'onConfirm',
        },

        actions: {
            'resize': 'onResize',
            'ready': 'onResize',
        },

        onResize: function() {
            this.updateEventsHeight();
        },

        onScroll: function(e) {
            if (!this.isEventsScrolled()) {
                $('#tail').removeClass('disabled');
            }
        },

        onStart: function(e, $el) {
            e.preventDefault();
            this.submitForm(this);
        },

        onStop: function(e) {
            e.preventDefault();
            this.stop();
        },

        onPause: function(e) {
            e.preventDefault();
            this.pause();
        },

        onClear: function(e) {
            e.preventDefault();
            this.clear(true);
        },

        onTail: function(e, $el) {

            e.preventDefault();

            if (!$el.hasClass('disabled')) {
                this.snapEventsScroll();
            }
        },

        onFilter: function(e, $el) {

            e.preventDefault();

            var status = $el.data('status');
            var $event = this.$eventStatus(status);

            if ($el.hasClass('disabled')) {
                $el.removeClass('disabled');
                $event.show();

            } else {
                $el.addClass('disabled');
                $event.not('[data-type="confirm"]').hide();

            }

            if ($('#tail').hasClass('disabled')) {
                this.snapEventsScroll();
            }

        },

        onConfirm: function(e, $el) {

            e.preventDefault();

            if (!this.busy) {

                // add button
                var $button = $(e.currentTarget),
                    $input = $button.closest('form').find('input[name="' + $button.attr('name') + '"]');

                if (!$input.length) {

                    $input = $('<input>', {
                        type: 'hidden',
                        name: $button.attr('name')
                    });

                    $input.insertAfter($button);

                }

                var $event = $el.closest('.event');

                $input.val($button.val());
                $event.attr('data-type', 'confirmed');

                this.confirmed = false;

                $('#start').attr('disabled', true);
                $('#stop').attr('disabled', false);
                $('#clear').attr('disabled', false);
                $('#pause').attr('disabled', false);

                this.newAjax();

                if ($input.val() === '1') {
                    $('.confirm-buttons').html('Confirmed').addClass('confirmed');
                } else {
                    $('.confirm-buttons').html('Canceled').addClass('confirmed');
                }

                // Hide event if filtered
                if ($('.filters > .filter[data-status="' + $event.attr('data-status') + '"]').hasClass('disabled')) {
                    $event.hide();
                }

                this.timer.start();

            }

        },

        submitForm: function(self) {

            // validate
            var valid = acf.validateForm({
                form: self.$('.wrap form'), // validate forms inside page wrap
                reset: true,
                success: function() {
                    self.start();
                }
            });

            // no fields, start anyway
            if (valid) {
                self.start();
            }

        },

        addEvent: function(args) {

            // Vars
            var details = '';
            var date = new Date();

            var currentTime = ('0' + date.getHours()).substr(-2) + ":" + ('0' + date.getMinutes()).substr(-2) + ":" + ('0' + date.getSeconds()).substr(-2);

            // Default
            args = acf.parseArgs(args, {
                i: this.i,
                time: currentTime,
                type: '',
                message: '',
                status: '',
                link: false,
                debug: '',
            });

            // Debug
            if (!acfe.isEmpty(args.debug)) {

                details += '' +
                    '<a href="#" data-modal>' + acf.__('Debug') + '</a>\n' +
                    '<div class="acfe-modal" data-title="' + acf.__('Debug') + '" data-footer="' + acf.__('Close') + '" data-size="large">\n' +
                    '    <div class="acfe-modal-spacer"><pre>' + args.debug + '</pre></div>\n' +
                    '</div>';

            }

            // Link
            if (args.link) {
                details = !details.length ? args.link : args.link + ' | ' + details;
            }

            // Confirm
            if (args.effect === 'confirm') {

                args.type = 'confirm';

                args.message += '<div class="confirm-buttons">' +
                    '   <button class="button button-primary" name="acf[confirm]" value="1">Confirm</button>' +
                    '   <button class="button" name="acf[confirm]" value="0">Cancel</button>' +
                    '</div>';

            }

            var isEventsScrolled = this.isEventsScrolled();

            // Prepend
            var $event = $('' +
                '<div class="event" data-status="' + args.status + '" data-type="' + args.type + '" data-i="' + args.i + '" data-time="' + args.time + '">\n' +
                '    <div class="time"><span>' + args.time + '</span></div>\n' +
                '    <div class="message">' + args.message + '</div>\n' +
                '    <div class="details">' + details + '</div>\n' +
                '</div>').appendTo(this.$events());

            // Hide event if filtered
            if ($('.filters > .filter[data-status="' + args.status + '"]').hasClass('disabled') && args.type !== 'confirm') {
                $event.hide();
            }

            var $clear = $('#clear');

            $clear.attr('disabled', false);

            if (args.type === 'clear') {
                $clear.attr('disabled', true);
            }

            this.updateFilters();

            if (isEventsScrolled) {
                this.snapEventsScroll();
            }

        },

        setup: function(props) {

            // setup element
            this.$el = $(document);

            // data
            this.set('script', acf.get('script'));
            this.set('run', acf.get('script_run'));

            // timer
            this.timer = new ACFEScriptsTimer();

            // stats
            this.stats = new ACFEScriptsStats();

        },

        initialize: function() {

            // disable window unload
            acf.unload.disable();

            // update events height
            this.updateEventsHeight();

            // force run onload
            if (this.get('run')) {
                this.submitForm(this);
            }

            // events scroll
            this.on(this.$events(), 'scroll', 'onScroll');

            // fix acf 6.0.6 where submit attribute disabled is hijacked by acf
            acf.enableSubmit = function($submit) {
                return $submit.removeClass('disabled');
            };
            acf.disableSubmit = function($submit) {
                return $submit.addClass('disabled');
            };

        },

        start: function() {

            // vars
            this.i = -1;
            this.scriptData = {};
            this.scriptStats = {};

            // controllers
            $('#start').attr('disabled', true);
            $('#pause').attr('disabled', false);
            $('#stop').attr('disabled', false);
            $('#clear').attr('disabled', false);

            // ajax
            this.newAjax({
                type: 'start'
            });

            // stats
            this.stats.clear();

            // timer
            this.timer.start(true);

        },

        stop: function(noNewAjax = false) {

            // stop & reset xhr
            if (this.xhr) {
                this.xhr.abort();
                this.xhr = false;
            }

            // reset
            this.$eventType('loading').remove();
            this.paused = false;
            this.confirmed = false;
            $('.confirm-buttons:not(.confirmed)').remove();

            // new ajax stop
            if (!noNewAjax) {
                this.newAjax({
                    type: 'stop',
                });
            }

            // buttons
            $('#start').attr('disabled', false);
            $('#pause').attr('disabled', true).removeClass('paused');
            $('#stop').attr('disabled', true);
            $('#clear').attr('disabled', false);

            // timer
            this.timer.clear();

        },

        pause: function() {

            // Pause
            if (!this.paused) {

                this.paused = true;

                $('#pause').attr('disabled', true);

                // Resume
            } else {

                if (!this.busy) {

                    this.paused = false;

                    $('#start').attr('disabled', true);
                    $('#stop').attr('disabled', false);
                    $('#clear').attr('disabled', false);
                    $('#pause').removeClass('paused');

                    this.newAjax();

                    this.timer.start();

                }

            }

        },

        doPause: function() {

            $('#start').attr('disabled', true);
            $('#stop').attr('disabled', false);
            $('#clear').attr('disabled', false);
            $('#pause').attr('disabled', false).addClass('paused');

            this.timer.pause();

            this.addEvent({
                i: '',
                type: 'pause',
                status: 'info',
                message: 'Pause'
            });

        },

        doConfirm: function() {

            $('#start').attr('disabled', true);
            $('#stop').attr('disabled', false);
            $('#clear').attr('disabled', false);
            $('#pause').attr('disabled', true);

            this.timer.pause();

        },

        clear: function(addEvent = false) {

            var hasConfirm = this.$eventType('confirm');

            // Clear all except confirm
            if (hasConfirm.length) {

                this.$events().find(' > *:not(.event[data-type="confirm"])').remove();

            } else {

                // Clear
                this.$events().html('');

                // Add event
                if (addEvent) {

                    this.addEvent({
                        i: '',
                        type: 'clear',
                        status: 'info',
                        message: 'Clear'
                    });

                }

            }

        },

        newAjax: function(ajaxData) {

            // pause
            if (this.paused) {
                return this.doPause();
            }

            // confirm
            if (this.confirmed) {
                return this.doConfirm();
            }

            // ajax data
            ajaxData = ajaxData || {};

            // parse
            ajaxData = acf.parseArgs(ajaxData, {
                action: 'acfe/ajax/script',
                script: this.get('script'),
                index: -1,
                type: 'request',
                data: this.scriptData,
                stats: this.scriptStats,
                fields: acf.serialize(this.$('form'), 'acf'),
            });

            // increment index
            if (ajaxData.type === 'request') {

                this.i++;
                ajaxData.index = this.i;

            }

            // filters
            ajaxData = acf.applyFilters('acfe/scripts/ajax_data', ajaxData, this);
            ajaxData = acf.applyFilters('acfe/scripts/ajax_data/name=' + this.get('script'), ajaxData, this);

            // send xhr
            this.xhr = $.ajax({
                url: acf.get('ajaxurl'),
                data: acf.prepareForAjax(ajaxData),
                type: 'post',
                dataType: 'json',
                context: this,
                beforeSend: this.onBeforeSend,
                success: this.onSuccess,
                complete: this.onComplete,
                statusCode: this.onStatusCode,
            });

        },

        onBeforeSend: function() {

            this.busy = true;

            this.addEvent({
                i: '',
                message: '<span class="spinner"></span>',
                type: 'loading',
            });

        },

        onSuccess: function(json) {

            // filters
            json = acf.applyFilters('acfe/scripts/ajax_success', json, this);
            json = acf.applyFilters('acfe/scripts/ajax_success/name=' + this.get('script'), json, this);

            // stats
            this.stats.update(json, this.timer.sec);

            // script data
            if (typeof json.data !== 'undefined') {
                this.scriptData = json.data;
            }

            // script data
            if (typeof json.stats !== 'undefined') {
                this.scriptStats = json.stats;
            }

            // effect: clear
            if (json.effect === 'clear') {

                this.clear();

                // effect: pause
            } else if (json.effect === 'pause' && !this.paused) {

                this.paused = true;

                // effect: confirm
            } else if (json.effect === 'confirm' && !this.confirmed) {

                this.confirmed = true;

            }

            // remove loading
            this.$eventType('loading').remove();

            // message
            if (typeof json.message !== 'undefined') {
                this.addEvent(json);
            }

            // override force restart
            if (this.restart) {

                this.restart = false;
                return this.start();

            }

            // event: request
            if (json.event === 'request') {

                return this.newAjax();

                // event: stop
            } else if (json.event === 'stop') {

                return this.stop();

                // event: restart
            } else if (json.event === 'restart') {

                this.restart = true;
                return this.stop();

            }

        },

        onComplete: function() {

            this.busy = false;

        },

        onStatusCode: {

            400: function() {

                this.addEvent({
                    type: 'error',
                    status: 'error',
                    message: 'Error 400: Request not found',
                });

                this.stop(true);

            },
            404: function() {

                this.addEvent({
                    type: 'error',
                    status: 'error',
                    message: 'Error 404: <code>admin-ajax.php</code> not found',
                });

                this.stop(true);

            },
            500: function() {

                this.addEvent({
                    type: 'error',
                    status: 'error',
                    message: 'Error 500: PHP error. Check your logs',
                });

                this.stop(true);

            },
            524: function() {

                this.addEvent({
                    type: 'error',
                    status: 'error',
                    message: 'Error 524: Timeout. Please reload the script',
                });

                this.stop(true);

            }

        },

        updateFilters: function() {

            $('.filters > .filter[data-status="success"]').html(this.$eventStatus('success').length);
            $('.filters > .filter[data-status="info"]').html(this.$eventStatus('info').length);
            $('.filters > .filter[data-status="error"]').html(this.$eventStatus('error').length);
            $('.filters > .filter[data-status="warning"]').html(this.$eventStatus('warning').length);

        },

        isEventsScrolled: function() {

            var out = this.$events()[0];
            return out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

        },

        snapEventsScroll: function() {

            $('#tail').addClass('disabled');

            var out = this.$events()[0];
            this.$events().scrollTop(out.scrollHeight - out.clientHeight);

        },

        updateEventsHeight: function() {

            // get postboxes height
            var postboxesHeight = 0;
            var $postboxes = this.$('#postbox-container-2 .postbox:not("#events")');

            $postboxes.each(function() {
                postboxesHeight += ($(this).outerHeight() + 20); // add margin bottom
            });

            // resize events height
            var windowHeight = window.innerHeight - (postboxesHeight + 270);
            this.$events().height(windowHeight);

        }

    });

    /**
     * Scripts UI: Timer
     */
    var ACFEScriptsTimer = acf.Model.extend({

        sec: 0,
        var: false,

        $time: function() {
            return $('#events .postbox-footer .timer > .time');
        },

        start: function(reset = false) {

            var self = this;

            if (reset) {
                self.$time().html('00:00:00');
            }

            var count = function() {

                ++self.sec;

                var hour = Math.floor(self.sec / 3600);
                var minute = Math.floor((self.sec - hour * 3600) / 60);
                var seconds = self.sec - (hour * 3600 + minute * 60);

                if (hour < 10) hour = "0" + hour;
                if (minute < 10) minute = "0" + minute;
                if (seconds < 10) seconds = "0" + seconds;

                self.$time().html(hour + ":" + minute + ":" + seconds);

            }

            this.var = setInterval(count, 1000);

        },

        pause: function() {

            clearInterval(this.var);

        },

        clear: function() {

            clearInterval(this.var);
            this.sec = 0;

        },

    });

    /**
     * Scripts UI: Stats
     */
    var ACFEScriptsStats = acf.Model.extend({

        $total: function() {
            return $('#events .postbox-footer .total');
        },

        $left: function() {
            return $('#events .postbox-footer .left');
        },

        $timeLeft: function() {
            return $('#events .postbox-footer .timeleft');
        },

        update: function(json, time) {

            if (json.stats.total > 0) {

                this.$total().show();
                this.$total().find('> span').html(json.stats.total);

            }

            if (json.stats.left > 0) {

                this.$left().show();
                this.$left().find('> span').html(json.stats.left);

            } else if (json.stats.total > 0 && json.stats.left >= 0) {

                this.$left().show();
                this.$left().find('> span').html(json.stats.left);

            }

            if (json.stats.total > 0 && json.stats.left >= 0 && json.stats.total !== json.stats.left) {

                var total = parseInt(json.stats.total);
                var left = parseInt(json.stats.left);
                var done = parseInt(total - left);

                time = parseInt(time);
                time = time === 0 ? 1 : time;

                var timeLeft = parseInt((time / done) * left);

                // in case of NaN
                if (!timeLeft) {
                    timeLeft = 0;
                }

                // override in case timeleft is 0
                if (timeLeft === 0 && left > 0) {
                    timeLeft = left;
                }

                var hour = Math.floor(timeLeft / 3600);
                var minute = Math.floor((timeLeft - hour * 3600) / 60);
                var seconds = timeLeft - (hour * 3600 + minute * 60);

                if (hour < 10) hour = "0" + hour;
                if (minute < 10) minute = "0" + minute;
                if (seconds < 10) seconds = "0" + seconds;

                this.$timeLeft().show();
                this.$timeLeft().find('> span').html(hour + ":" + minute + ":" + seconds);

            }

        },

        clear: function() {

            this.$total().find('> span').html('-');
            this.$left().find('> span').html('-');
            this.$timeLeft().find('> span').html('-');

        },

    });

})(jQuery);
(function($) {

    if (typeof acf === 'undefined' || typeof acfe === 'undefined') {
        return;
    }

    var moduleManager = new acf.Model({
        wait: 'prepare',
        priority: 1,
        initialize: function() {
            if (acf.get('screen') === 'acfe_settings') {
                new module();
            }
        }
    });

    var module = acf.Model.extend({

        actions: {
            'new_field': 'newField',
        },

        events: {
            'click [data-acfe-settings-action="edit"]': 'onClickEdit',
            'click [data-acfe-settings-action="default"]': 'onClickDefault',
        },

        onClickEdit: function(e, $el) {

            var key = $el.data('acfe-settings-field');
            var field = acf.getField(key);

            field.showEnable(field.cid);

            acf.hide($el);
            acf.show($el.closest('div').find('[data-acfe-settings-action="default"]'));

            var $tab = $el.closest('.inside').find('> .acf-tab-wrap > .acf-tab-group > li.active span.acfe-tab-badge');
            var count = parseInt($tab.text()) + 1;
            $tab.text(count);

            if (count > 0) {
                acf.show($tab);
            }

        },

        onClickDefault: function(e, $el) {

            var key = $el.data('acfe-settings-field');
            var field = acf.getField(key);

            field.hideDisable(field.cid);

            acf.hide($el);
            acf.show($el.closest('div').find('[data-acfe-settings-action="edit"]'));

            var $tab = $el.closest('.inside').find('> .acf-tab-wrap > .acf-tab-group > li.active span.acfe-tab-badge');
            var count = parseInt($tab.text()) - 1;
            $tab.text(count);

            if (count === 0) {
                acf.hide($tab);
            }

        },

        newField: function(field) {
            if (field.$el.hasClass('acfe-disabled')) {
                field.hideDisable(field.cid);
            }
        }

    });

})(jQuery);