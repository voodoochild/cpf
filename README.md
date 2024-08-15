# Payment Flow

## Assumptions

- Bill summary is hard-coded, but would come from an API
- Copy is hard-coded, but could use an i18n micro-service
- User isn't able to go back and change payment details
- Rounded line-height values when moving from pixels to relative
- Validating fields on blur, but could be on change, or submit instead
- No designs for other button states
- Design tokens are in `globals.css`, but should be imported from the design system

## TODO

- [ ] Create `<Input>` and `<Button>` components
- [ ] Build the page layout form
- [ ] Mock i18n helper function
- [ ] Add state management to handle the flow
- [ ] Add field validation
- [ ] Fix up the styling to match designs
- [ ] Add unit test coverage with react-testing-library

## Evaluation Criteria

Your assignment will be evaluated by both an engineer and a designer on the following criteria:

- Adherence to provided requirements
- Code structure, readability, and maintainability
- UI design fidelity & attention to detail
- Error handling and validation
- Test coverage and quality
- Accessibility (ie. semantic HTML elements, ARIA attributes, keyboard navigability)
- Thought process and rationale behind design decisions

### Notes

"Hi, Taylor" -- Arial; size 28px; line-height 36px; weight 700; color #13126C;
"You have..." -- Arial; size 16px; line-height 24px; spacing 0.2px; weight 400; color #171731;
"Total due" -- arial 700 size 16px height 24px spacing 0.2 color #65657B;
Button text -- arial 700 16px 24px height 0.2 spacing color white weight 700
"Payment information" -- arial 700 20px 24px height 0.2 spacing color #171731;

form label -- arial 700 14px/20px 0.2 spacing color #65657B;
field border -- border: 1px solid #6D7088 8px radius
field padding 12px, 16px

error message -- 400 14/20

"You're about to make..." 400 20/24
"Payment method" 14/20 700
"Card ending in" 14/20

"Thank you..." 28/36
