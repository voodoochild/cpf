# Payment Flow

- Install [pnpm](https://pnpm.io/installation)
- `pnpm install`
- `pnpm dev` and then view at `http://localhost:3000/`
- `pnpm run test`

## Assumptions

- Bill summary is hard-coded, but would come from an API
- Copy is hard-coded, but could use an i18n micro-service
- User isn't able to go back and change payment details
- Rounded line-height values when moving from pixels to relative
- Validating fields on blur, but could be on change, or submit instead
- No designs for other button states
- Design tokens are in `globals.css`, but should be imported from the design system
- There are some obvious gaps in test coverage, but this is a quick example

## TODO

- [x] Create `<Input>` and `<Button>` components
- [x] Build the page layout form
- [x] Add state management to handle the flow
- [x] Add field validation
- [x] Fix up the styling to match designs
- [x] Add unit test coverage with react-testing-library

## Evaluation Criteria

Your assignment will be evaluated by both an engineer and a designer on the following criteria:

- Adherence to provided requirements
- Code structure, readability, and maintainability
- UI design fidelity & attention to detail
- Error handling and validation
- Test coverage and quality
- Accessibility (ie. semantic HTML elements, ARIA attributes, keyboard navigability)
- Thought process and rationale behind design decisions
