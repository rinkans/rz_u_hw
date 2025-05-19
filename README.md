# Ubiquiti homework by Rinalds Zukulis

## Links

[Hosted web app](https://ubiquiti-rz.netlify.app/)

## To Do, if would have more time

1. Performance optimisation

Currently only checked some places for performance and seems fine, but could be better (example: MultiSelect)

Overall React Virtuoso works quite well (Big table would've been the biggest performance bottleneck)

2. Improve css variable naming and placement

3. Did not have time to implement Grid view

4. Combine icons into font as that way would be able to get rid of icons as React Components

5. Currently are using array index as id in Product view and also because of Next and Previous buttons to work. Probably should get better way of getting prev and next product, but that might need to come from backend.

6. Might need to add better state management, but with current requirements, there was no need.

7. Products -> FilterPanel = Currently both components save state, but could refactor to have single source of truth component
