/* global d3, moment */
(function ($, d3, moment) {
	'use strict';

	var toTimeToday = function (time) {

		if (time instanceof Date) {
			return moment({ hours: time.getHours(), minutes: time.getMinutes() }).toDate();
		} else {
			return moment(time, 'HH:mm').toDate();
		}
	};

	var toDay = function (date) {

		if (date instanceof Date) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate());
		} else {
			return moment(date).toDate();
		}
	};

	var toDateTime = function (date) {

		if (date instanceof Date) {
			return date;
		} else {
			return moment(date).toDate();
		}
	};

	$.widget('jke.calendar', {

		// Default options
		options: {

			margin: {
				top: 20,
				right: 0,
				bottom: 10,
				left: 40
			},

			height: 600,
			width: 800,

			startDate: '2014-01-02',
			endDate: '2014-01-07',

			startTime: '07:00',
			endTime: '18:00'
		},

		_create: function () {
			var widget = this;

			// Create the SVG element to render the calendar into.
			widget.svg = d3.select(widget.element[0]).append('svg')
					.attr('height', widget.options.height)
					.attr('width', widget.options.width);


			// Adjust the dimensions to compensate for the margins.
			widget.options.height = widget.options.height - widget.options.margin.top - widget.options.margin.bottom;
			widget.options.width = widget.options.width - widget.options.margin.left - widget.options.margin.right;

			// Convert the times into Date objects.
			widget.options.startDate = toDay(widget.options.startDate);
			widget.options.endDate = toDay(widget.options.endDate);
			widget.options.startTime = toTimeToday(widget.options.startTime);
			widget.options.endTime = toTimeToday(widget.options.endTime);


			// Create a root canvas to put all elements into and move it according to the margins.
			// The extra 0.5 pixels is to avoid blur on retina screens.
			widget.canvas = widget.svg
					.append('g')
					.attr('transform', 'translate(' +
							(widget.options.margin.left + 0.5) + ',' +
							(widget.options.margin.top + 0.5) + ')');

			// Create a background for the calendar area.
			widget.canvas.call(function (selection) {
				widget.background = selection.append('rect')
						.classed('jke-calendar-background', true)
						.attr('height', widget.options.height)
						.attr('width', widget.options.width)
						.attr('x', 0).attr('y', 0);
			});


			// Create a scale for the y-coordinates.
			widget.yScale = d3.time.scale()
					.domain([widget.options.startTime, widget.options.endTime])
					.range([0, widget.options.height]);

			// Create a scale for x-coordinates.
			widget.xScale = d3.time.scale()
					.domain([widget.options.startDate, d3.time.day.offset(widget.options.endDate, 1)])
					.range([0, widget.options.width]);


			// Create the y-axis.
			widget.yAxisGenerator = d3.svg.axis()
					.scale(widget.yScale)
					.orient('left')
					.outerTickSize(0)
					.ticks(d3.time.hour)
					.tickFormat(d3.time.format('%H:%M'));
			widget.yAxis = widget.canvas
					.append('g')
					.classed('jke-calendar-axis-y', true)
					.call(widget.yAxisGenerator);

			// Create a horizontal grid.
			widget.ySubGridGenerator = d3.svg.axis()
					.scale(widget.yScale)
					.orient('left')
					.innerTickSize(-widget.options.width)
					.outerTickSize(0)
					.ticks(d3.time.minutes, 30)
					.tickFormat('');
			widget.ySubGrid = widget.canvas
					.append('g')
					.classed('jke-calendar-subGrid-y', true)
					.call(widget.ySubGridGenerator);
			widget.yGridGenerator = d3.svg.axis()
					.scale(widget.yScale)
					.orient('left')
					.innerTickSize(-widget.options.width)
					.outerTickSize(0)
					.ticks(d3.time.hour)
					.tickFormat('');
			widget.yGrid = widget.canvas
					.append('g')
					.classed('jke-calendar-grid-y', true)
					.call(widget.yGridGenerator);


			// Create function to get the width of one day.
			widget.getDayWidth = function () {
				var now = new Date();
				return widget.xScale(d3.time.day.offset(now, 1)) - widget.xScale(now);
			};

			// Create function center the x-axis label.
			widget.centerLabel = function (selection) {
				selection.selectAll('.jke-calendar-axis-x text')
						.attr('transform', 'translate(' + (widget.getDayWidth() / 2) + ',0)');
			};

			// Create the x-axis.
			widget.xAxisGenerator = d3.svg.axis()
					.scale(widget.xScale)
					.orient('top')
					.outerTickSize(0)
					.ticks(d3.time.day)
					.tickFormat(d3.time.format('%a %d'));
			widget.xAxis = widget.canvas
					.append('g')
					.classed('jke-calendar-axis-x', true)
					.call(widget.xAxisGenerator)
					.call(widget.centerLabel);

			// Create a vertical grid.
			widget.xGridGenerator = d3.svg.axis()
					.scale(widget.xScale)
					.orient('top')
					.ticks(d3.time.day)
					.innerTickSize(-widget.options.height)
					.outerTickSize(0)
					.tickFormat('');
			widget.xGrid = widget.canvas
					.append('g')
					.classed('jke-calendar-grid-x', true)
					.call(widget.xGridGenerator);


			// Create a clipping mask to make sure that the calendar events don't escape.
			widget.svg.call(function (selection) {
				widget.clipMask = selection
						.append('defs')
						.append('svg:clipPath')
						.attr('id', 'calendarClip')
						.append('svt:rect')
						.attr('x', 0).attr('y', 0)
						.attr('height', widget.options.height)
						.attr('width', widget.options.width);
			});

			// Create a group to put all events in for styling and clipping.
			widget.eventArea = widget.canvas
					.append('g')
					.classed('jke-calendar-events', true)
					.attr('clip-path', 'url(#calendarClip)');

			if (widget.options.data) {
				var d;
				for (var i = 0; i < widget.options.data.length; i++) {
					d = widget.options.data[i];

					d.startTime = toDateTime(d.startTime);
					d.endTime = toDateTime(d.endTime);

					d._day = toDay(d.startTime);
					d._start = toTimeToday(d.startTime);
					d._end = toTimeToday(d.endTime);
				}
				widget.data = widget.options.data;
				widget._redraw(false);
			}
		},

		_destroy: function () {
			this.element.remove('svg');
		},

		_redraw: function (animate) {
			var widget = this;

			var delay1 = animate ? 800 : 0;
			var delay2 = animate ? 300 : 0;

			var getEventHeight = function (d) {
				return widget.yScale(d._end) - widget.yScale(d._start);
			};

			var getEventWidth = function () {
				return widget.getDayWidth() - 15;
			};

			var getEventPosition = function (d) {
				return 'translate(' + (widget.xScale(d._day) + 7) + ',' + widget.yScale(d._start) + ')';
			};

			var getEventId = function (d) {
				return d.id;
			};

			var getEventTimeText = function (d) {
				var format = d3.time.format('%H:%M');
				return format(d._start) + ' - ' + format(d._end);
			};

			var getEventNotesText = function (d) {
				return d.notes;
			};

			var sendClickEvent = function (d) {
				widget._trigger('click', null, d.id);
			};

			// Update the scales.
			widget.yScale.domain([widget.options.startTime, widget.options.endTime]);
			widget.xScale.domain([widget.options.startDate, d3.time.day.offset(widget.options.endDate, 1)]);

			// Update the generators to make sure they match the updated options.
			widget.ySubGridGenerator.innerTickSize(-widget.options.width);
			widget.yGridGenerator.innerTickSize(-widget.options.width);
			widget.xGridGenerator.innerTickSize(-widget.options.height);

			// Update the axis and grids.
			widget.yAxis
					.transition().duration(delay1)
					.call(widget.yAxisGenerator);
			widget.ySubGrid
					.transition().duration(delay1)
					.call(widget.ySubGridGenerator);
			widget.yGrid
					.transition().duration(delay1)
					.call(widget.yGridGenerator);
			widget.xAxis
					.transition().duration(delay1)
					.call(widget.xAxisGenerator)
					.call(widget.centerLabel);
			widget.xGrid
					.transition().duration(delay1)
					.call(widget.xGridGenerator);


			// Create a selection for all event background boxes.
			var eventBoxes = widget.eventArea.selectAll('rect')
					.data(widget.data, getEventId);

			// Update the dimension and position for updated events.
			eventBoxes
					.transition().duration(delay1)
					.attr('width', getEventWidth)
					.attr('transform', getEventPosition)
					.attr('height', getEventHeight);

			// Append a new rect to each of the placeholders for new events.
			eventBoxes.enter()
					.append('rect')
					.attr('x', 0).attr('y', 0)
					.attr('height', 0)
					.attr('opacity', 0)
					.attr('width', getEventWidth)
					.attr('transform', getEventPosition)
					.on('click', sendClickEvent)
					.transition().duration(delay1)
					.attr('height', getEventHeight)
					.attr('opacity', 1);

			// Remove all removed events from their placeholders.
			eventBoxes.exit()
					.transition().duration(delay2)
					.attr('width', 0)
					.remove();


			// Create a selection for all event left borders.
			var eventBorders = widget.eventArea.selectAll('line')
					.data(widget.data, getEventId);

			// Update the dimensions and position for updated events.
			eventBorders
					.transition().duration(delay1)
					.attr('transform', getEventPosition)
					.attr('y2', getEventHeight);

			// Append a new line to each of the placeholders for new events.
			eventBorders.enter()
					.append('line')
					.attr('x1', 0).attr('x2', 0)
					.attr('y1', 0).attr('y2', 0)
					.attr('transform', getEventPosition)
					.transition().duration(delay1)
					.attr('y2', getEventHeight);

			// Remove all removed events from their placeholders.
			eventBorders.exit()
					.transition().duration(delay2)
					.attr('opacity', 0)
					.remove();

			// Create a selection for all event time texts.
			var eventTimes = widget.eventArea.selectAll('text.jke-calendar-time')
					.data(widget.data, getEventId);


			// Update the text and position for updated events.
			eventTimes
					.text(getEventTimeText)
					.transition().duration(delay1)
					.attr('transform', getEventPosition);

			// Append a new text to each of the placeholders for new events.
			eventTimes.enter()
					.append('text')
					.classed('jke-calendar-time', true)
					.text(getEventTimeText)
					.attr('x', 8).attr('y', 18)
					.attr('transform', getEventPosition)
					.attr('opacity', 0)
					.transition().duration(delay1)
					.attr('opacity', 1);

			// Remove all removed events from their placeholders.
			eventTimes.exit()
					.transition().duration(delay2)
					.attr('opacity', 0)
					.remove();


			// Create a selection for all event notes texts.
			var eventNotes = widget.eventArea.selectAll('text.jke-calendar-notes')
					.data(widget.data, getEventId);

			// Update the text and position for updated events.
			eventNotes
					.text(getEventNotesText)
					.transition().duration(delay1)
					.attr('transform', getEventPosition);

			// Append a new text to each of the placeholders for new events.
			eventNotes.enter()
					.append('text')
					.classed('jke-calendar-notes', true)
					.text(getEventNotesText)
					.attr('x', 8).attr('y', 33)
					.attr('transform', getEventPosition)
					.attr('opacity', 0)
					.transition().delay(delay1 - delay2)
					.duration(delay2)
					.attr('opacity', 1);

			// Remove all removed events from their placeholders.
			eventNotes.exit()
					.transition().duration(delay2)
					.attr('opacity', 0)
					.remove();
		},


		// Public API to change the settings and data after the calendar is created.

		setDateInterval: function (startDate, endDate) {

			this.options.startDate = toDay(startDate);
			this.options.endDate = toDay(endDate);
			this._redraw(true);
		},

		setTimeInterval: function (startTime, endTime) {

			this.options.startTime = toTimeToday(startTime);
			this.options.endTime = toTimeToday(endTime);
			this._redraw(true);
		},

		setDimensions: function (width, height) {
			var widget = this;

			// Update dimensions of the svg (using the untouched height and width)
			widget.svg
					.attr('height', height)
					.attr('width', width);

			// Adjust the dimensions to compensate for the margins.
			widget.options.height = height - widget.options.margin.top - widget.options.margin.bottom;
			widget.options.width = width - widget.options.margin.left - widget.options.margin.right;

			// Update the dimensions of the background.
			widget.background
					.attr('height', widget.options.height)
					.attr('width', widget.options.width);

			// Update the dimensions of the clipping mask.
			widget.clipMask
					.attr('height', widget.options.height)
					.attr('width', widget.options.width);

			// Update the scales.
			widget.yScale.range([0, widget.options.height]);
			widget.xScale.range([0, widget.options.width]);

			this._redraw(false);
		},

		updateData: function (data) {

			var d;
			for (var i = 0; i < data.length; i++) {
				d = data[i];

				d.startTime = toDateTime(d.startTime);
				d.endTime = toDateTime(d.endTime);

				d._day = toDay(d.startTime);
				d._start = toTimeToday(d.startTime);
				d._end = toTimeToday(d.endTime);
			}

			this.data = data;
			this._redraw(true);
		}
	});

})($, d3, moment);
