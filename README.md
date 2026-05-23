# shoppinglist

A React Router based frontend and node backend REST API for managing a shopping list.

## Frontend

For details on how to run the frontend server, please refer to [./frontend](./frontend/README.md)

## Backend

For details on how to run the backend server, please refer to [./backend/listapi](./backend/listapi/README.md)

## Testing

After running the backend and frontend, you can test the list display using the following users;

| username | effect                                             |
| -------- | -------------------------------------------------- |
| user1    | Will display test data                             |
| user2    | User exists, but has no list against their account |
| (other)  | Will fail to find the account                      |

When the front end is displayed, enter the user followed by pressing the Submit button.

## Notes

### UX Design

No styles have been applied to the UI, using the default for the React Router project. Unfortunately this means the controls are currently difficult to see. It would be beneficial as a next step to incorporate a third party library such as MUI to skin the controls.

The chosen UI library may also provide controls for list displays that provide drag and drop functionality for the shopping list, rather than
implementing manually with HTML buttons as has currently been done with the delete button.

### Tracking of changes per story

Each commit has been made using conventional commit messages so that the revision history can be linked to each story at a glance. I have squashed and rebased some commits, but not all per story so that you can better understand the development history.

All stories have been merged to the `main` branch using pull requests, the list of [closed pull requests](https://github.com/jfgoss/shoppinglist/pulls?q=is%3Apr+is%3Aclosed) in GitHub will show how these have been managed.

### GPG signed commits

The commits are unverified as the email address associated with the GPG key
has not yet been verified by a service used by GitHub.

### Inclusion of a backend REST API for data handling

Whilst this may have been over engineered, it would have been possible to hard code test data directly into
the React frontend, one of the requirements was for security of data. With this in mind, I opted to have
a REST API that would act as protection of a shopper's personal data using a token in an `authorization`
header.

### Multiple users

Support for multiple users was included from story [#1](https://github.com/jfgoss/shoppinglist/issues/1) as
I did not want to have an open REST API for the node back end. The intention being that a fully secure login
would be implemented as story [#10](https://github.com/jfgoss/shoppinglist/issues/10)

### Security advisories

I have enabled security scanning on the project within GitHub. This includes a [report for vulnerabilities](https://github.com/jfgoss/shoppinglist/security/code-scanning).

Whilst any existing vulnerabilities have not yet been resolved, the intent would be to do so as soon as
possible.

### Agreed time

I originally estimated that I would complete about half of the tickets, marked as [milestone 6hrTarget](https://github.com/jfgoss/shoppinglist/milestone/1) in GitHub.

However, I ran in to a variety of issues that delayed my progress
 - I underestimated the effort of creating a comprehensive suite of unit tests 
 - Snapshot tests for React components were failing
   - See [issue #16](https://github.com/jfgoss/shoppinglist/issues/16)
   - Because this was not fixed within the allotted time I have [raised a PR](https://github.com/jfgoss/shoppinglist/pull/17/changes) for the resolution
   - Issues were due to missing imports and jest configuration file 
 - CORS support when debugging in Google Chrome
 - Implementing a front and backend with auth header was a bigger task than estimated
