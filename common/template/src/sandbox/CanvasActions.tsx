import { fabric } from 'fabric';
import React, { useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useActiveCanvas } from './hooks';

export const CanvasActions = React.memo(() => {
    const [ready, canvas] = useActiveCanvas();
    const toJSON = useCallback(() => {
        const json = canvas.current!.toJSON();
        const out = JSON.stringify(json, null, "\t");
        console.log(out);
        const blob = new Blob([out], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = 'fabric-snapshot.json';
        link.click();
    }, [canvas]);
    const fromJSON = useCallback((e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const data = JSON.parse(reader.result);
            canvas.current!.loadFromJSON(data);
            delete e.target.files;
            e.target.value = '';
        }
        reader.readAsText(file);
    }, [canvas]);
    const toPNG = useCallback(() => {
        const base64 = canvas.current!.toDataURL({
            format: 'png',
            enableRetinaScaling: true
        });
        const link = document.createElement("a");
        link.href = base64;
        link.download = 'fabric-snapshot.png';
        link.click();
    }, [canvas]);
    const toSVG = useCallback(() => {
        const svg = canvas.current!.toSVG();
        const a = document.createElement("a");
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const blobURL = URL.createObjectURL(blob);
        a.href = blobURL;
        a.download = "fabric-snapshot.svg";
        a.click();
        URL.revokeObjectURL(blobURL);
    }, [canvas]);
    const fromSVG = useCallback((e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            fabric.loadSVGFromString(reader.result, (result) => {
                canvas.current!.add(...result);
            });
            delete e.target.files;
            e.target.value = '';
        }
        reader.readAsText(file);
    }, [canvas]);

    return ready ?
        (
            <div>
                <Button
                    variant='outline-primary'
                    onClick={toJSON}
                >
                    toJSON
                </Button>
                <Form.Group controlId="fromJSON" className="mb-3">
                    <Form.Label className='form-label btn btn-outline-primary'>
                        from JSON
                    </Form.Label>
                    <Form.Control hidden type="file" onChange={fromJSON} accept='application/json' />
                </Form.Group>
                <Button
                    variant='outline-primary'
                    onClick={toPNG}
                >
                    to Image
                </Button>
                <Button
                    variant='outline-primary'
                    onClick={toSVG}
                >
                    toSVG
                </Button>
                <Form.Group controlId="fromSVG" className="mb-3">
                    <Form.Label className='form-label btn btn-outline-primary'>
                        from SVG
                    </Form.Label>
                    <Form.Control hidden type="file" onChange={fromSVG} accept='image/svg+xml' />
                </Form.Group>
            </div>
        ) :
        null;
})