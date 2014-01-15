# jke-d3-calendar

This is a calendar component built on top of [D3.js](http://d3js.org) and it was built to be used as part of two presentations
([Rethink your frontend architecture](https://github.com/joakimkemeny/presentation.frontend) and
[Better and more fun applications with D3.js](https://github.com/joakimkemeny/presentation.d3)) and it should **NOT**
be considered production quality yet.

The calendar displays a list of events in a week view with any number of days and animates all changes to the events, to the dimensions and to the date and time intervals. You can find a live demo [here](http://joakimkemeny.github.io/jke.d3.calendar).

## Usage

To use this calendar you first need to download it and all of its dependencies. The easiest way to do that is through [Bower](http://bower.io).

```
> bower install https://github.com/joakimkemeny/jke.d3.calendar.git --save
```

The second step is to include all dependencies in your HTML and initialize the calendar.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="bower_components/jke-d3-calendar/dist/jke-d3-calendar.css">
</head>
<body>

	<!-- Placeholder for the calendar -->
	<div class="jke-calendar"></div>

	<!-- Include dependencies -->
	<script src="bower_components/jquery/jquery.min.js"></script>
	<script src="bower_components/jquery-ui/ui/minified/jquery.ui.widget.min.js"></script>
	<script src="bower_components/d3/d3.min.js"></script>
	<script src="bower_components/moment/min/moment.min.js"></script>

	<!-- Include jke-d3-calendar and initialize the calendar -->
	<script src="bower_components/jke-d3-calendar/dist/jke-d3-calendar.min.js"></script>
	<script>
		$('.jke-calendar').calendar({

			height: 600,
			width: 800,

			startDate: '2014-01-06',
			endDate: '2014-01-08',

			startTime: '07:00',
			endTime: '18:00'

		});
	</script>

</body>
</html>
```

The last step is to add some events to the calendar.

```javascript
$('.jke-calendar').calendar('updateData', [
	{
		id: 1,
		startTime: '2014-01-06 08:00',
		endTime: '2014-01-06 13:00',
		notes: 'Morning meeting'
	},
	{
		id: 2,
		startTime: '2014-01-07 11:00',
		endTime: '2014-01-07 13:00',
		notes: 'Lunch'
	}
]);
```

You can call `updateData` as many times as you want and as long as the id:s of the events match it will animate changes to them and add and remove events as needed.

Finally you can change the options that you specified when you initialized the calendar at any time.

```javascript
$('.jke-calendar').calendar('setDimensions', 1000, 800);
$('.jke-calendar').calendar('setDateInterval', '2014-01-02', '2014-01-05');
$('.jke-calendar').calendar('setTimeInterval', '07:00', '20:00');
```

If you want the events to be clickable you can provide a click handler like this.

```javascript
// Attach on initialization...
$('.jke-calendar').calendar({
	click: function (e, id) {
		console.log(id);
	}
});

// ...or attach later
$('.jke-calendar').bind('calendarclick', function (e, id) {
	console.log(id);
});
```

## Customize

If you want to customize the appearance of the calendar you can easily change all of the colors. If you use CSS or LESS you have to do this directly in the code but if you use Sass you can change all colors like this:

```scss
$jke-calendar-axisColor: #ddd;
$jke-calendar-backgroundColor: #fff;
$jke-calendar-xGridColor: #fff;
$jke-calendar-yGridColor: #ddd;

$jke-calendar-xTextColor: #000;
$jke-calendar-yTextColor: #999;

$jke-calendar-eventBorderColor: #f4771b;
$jke-calendar-eventBackgroundColor: #fdebde;
$jke-calendar-eventTimeColor: #f4771b;
$jke-calendar-eventNotesColor: #000;

@import "bower_components/jke-d3-calendar/src/scss/jke-d3-calendar";
```

## Known issues

* Events cannot span multiple days.
* Texts inside the events are not clipped or wrapped.
* The first time label may not be hiddden correctly if the time interval is changed.

## Contact

If you have any questions or if you want the live version of any of the presentations that this component is a part of you can contact me on Twitter [@joakimkemeny](http://twitter.com/joakimkemeny).

## License

The source code for the presentation and the demos is licensed under the Apache License,
Version 2.0 (the "License"); you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

[http://www.apache.org/licenses/LICENSE-2.0]()

Unless required by applicable law or agreed to in writing, software distributed under the License
is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing permissions and limitations under
the License.
