# Changes

### 2.3.0

Added ```destructuredConstructorTest```, ```functionDestructuredParameterTest```, ```methodDestructuredParameterTest``` to allow for testing where destructured parameters are used.

### 2.2.0

Added skip and only capabilities to ```createExperiment```.

```js
const group = testing.createExperiment("One", "Two");

group.skip("My Group", () => {

});

group.only("My Group", () => {

});
```

Also this releases also fixes a spelling error with the method name ```standardConstructorTest```. The existing ```standardContructorTest``` method will continue to work to avoid a breaking change but will ```console.warn``` you to change to the correct method. The mispelled method will be deprecated at the next major release.
