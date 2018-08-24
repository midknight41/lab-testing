# Changes

### 3.0.0

Updated all dependencies to latest major versions. Updated to work with latest version of lab which no longer supports the done callback in tests, as such the minimum version of lab this package will work with is 15.0.0 and minimum node version is 8.9
Removed deprecated methods ```standardContructorTest```, ```LabTesting.methodParameterTest```, ```LabTesting.functionParameterTest```

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
