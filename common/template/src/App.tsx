import React from 'react';
//  open `./fabric/fabric.ts` to change the import source (local build or published module)
import { fabric, useCanvas } from './fabric';
import { Comments, useSandboxHooks } from './sandbox';

const App = React.memo(() => {
  const [fc, setRef] = useCanvas(canvas => {
    // do stuff with canvas after initialization
    canvas.backgroundColor = 'white';
    const text = new fabric.Text('Fabric.js Sandbox');
    canvas.add(text);
    text.center();
  });
  useSandboxHooks(fc);

  return (
    <>
      <Comments>
        {/**add comments explaning what this is all about */}
      </Comments>
      <canvas
        width={500}
        height={500}
        ref={setRef}
      />
    </>
  );
});

export default App;