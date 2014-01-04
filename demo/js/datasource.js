/* global moment */
(function ($, moment) {
	'use strict';

	// A list of data point samples.
	var _data = [
		{
			id: 1,
			startTime: moment('2014-01-03 08:00').toDate(),
			endTime: moment('2014-01-03 13:00').toDate(),
			notes: 'Kalle Kula'
		},
		{
			id: 2,
			startTime: moment('2014-01-02 10:00').toDate(),
			endTime: moment('2014-01-02 14:00').toDate(),
			notes: 'Jonas Svensson'
		},
		{
			id: 3,
			startTime: moment('2014-01-03 13:00').toDate(),
			endTime: moment('2014-01-03 15:00').toDate(),
			notes: 'Anna Johansson'
		},
		{
			id: 4,
			startTime: moment('2014-01-03 15:30').toDate(),
			endTime: moment('2014-01-03 16:30').toDate(),
			notes: 'Karin Juhlin'
		},
		{
			id: 5,
			startTime: moment('2014-01-05 08:30').toDate(),
			endTime: moment('2014-01-05 16:30').toDate(),
			notes: 'Karin Juhlin'
		}
	];

	$('.jke-calendar').calendar('updateData', _data);

	setTimeout(function () {
		$('.jke-calendar').calendar('updateData', [
			{
				id: 6,
				startTime: moment('2014-01-02 08:00').toDate(),
				endTime: moment('2014-01-02 14:00').toDate(),
				notes: 'Jonas Svensson'
			},
			{
				id: 3,
				startTime: moment('2014-01-03 13:00').toDate(),
				endTime: moment('2014-01-03 15:00').toDate(),
				notes: 'Anna Johansson'
			},
			{
				id: 4,
				startTime: moment('2014-01-03 15:30').toDate(),
				endTime: moment('2014-01-03 16:30').toDate(),
				notes: 'Karin Juhlin'
			},
			{
				id: 5,
				startTime: moment('2014-01-06 08:30').toDate(),
				endTime: moment('2014-01-06 16:30').toDate(),
				notes: 'Karin Juhlin'
			}
		]);
	}, 2000);

	setTimeout(function () {
		$('.jke-calendar').calendar('updateData', [
			{
				id: 7,
				startTime: moment('2014-01-03 08:00').toDate(),
				endTime: moment('2014-01-03 13:00').toDate(),
				notes: 'Kalle Kula'
			},
			{
				id: 6,
				startTime: moment('2014-01-02 08:00').toDate(),
				endTime: moment('2014-01-02 14:00').toDate(),
				notes: 'Jonas Svensson'
			},
			{
				id: 3,
				startTime: moment('2014-01-03 13:00').toDate(),
				endTime: moment('2014-01-03 15:00').toDate(),
				notes: 'Anna Johansson'
			},
			{
				id: 4,
				startTime: moment('2014-01-04 16:30').toDate(),
				endTime: moment('2014-01-04 17:30').toDate(),
				notes: 'Karin Juhlin'
			},
			{
				id: 5,
				startTime: moment('2014-01-04 07:30').toDate(),
				endTime: moment('2014-01-04 16:00').toDate(),
				notes: 'Karin Juhlin'
			}
		]);
	}, 4000);

	setTimeout(function () {
		$('.jke-calendar').calendar('setDateInterval', '2014-01-02', '2014-01-05');
	}, 6000);

	setTimeout(function () {
		$('.jke-calendar').calendar('setTimeInterval', '07:00', '20:00');
	}, 8000);

	setTimeout(function () {
		$('.jke-calendar').calendar('setDimensions', 1000, 800);
	}, 10000);

})($, moment);
