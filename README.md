# jke-d3-calendar

This is a calendar component built on top of [D3.js](http://d3js.org) and it was built to be used as part of two presentations
([Rethink your frontend architecture](https://github.com/joakimkemeny/presentation.frontend) and
[Better and more fun applications with D3.js](https://github.com/joakimkemeny/presentation.d3)) and it should **NOT**
be considered production quality yet.

The calendar displays a list of events in a week view with any number of days and animates all changes to the events, to the dimensions and to the time and date intervals. You can find a live demo [here](http://joakimkemeny.github.io/jke.d3.calendar).

## Usage

TBD

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
