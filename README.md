Repository for Northeastern University CS4550.
Alex Aubuchon 2016

The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs

***GRADERS PLEASE READ***

Release: Assignment 2

-I decided to use Angular Material instead of Bootstrap, which was okay'ed by the professor in
class. This required angular, though I only used it the bare minimum.

-If a button press leads back to the login page when you don't think it should, that is because the
login page is my default angular route. The link likely leads there because it is a widget I haven't
designed yet (Label, Button, etc..).

-You may see instances where instead of filler text, I used a butchered angular injection snipped
".{....}}". This is so in the coming weeks, these spots are easier for me to spot.

-Angular Material currently has a limitation with multi-line textarea inputs which should hopefully
be fixed in the next release. Until then, I have a rather hacky CSS fix.

-I decided not to include the foot bar shown in the mockups. It takes up too much space for what it
is, and I put access to profile in the hamburger menu at the top left.

-Whenever a mockup showed a "save" icon at the top right, I instead chose to use a button below the
changed input fields, for improved clarity.

-My html file names are different than specified, but everything that was required is there, and the
hierarchical structure should make sense.

-I currently have my website list page implemented with a cards system, instead of a list. I think
it looks pretty nice!

Finally, I took a fair amount of liberty in the flow and style of this first design. Each decision
deviating from the assignment was well thought out, and not a short-circuit of laziness. I hope
that is acceptable.
