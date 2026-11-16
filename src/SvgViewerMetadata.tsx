import React, { useEffect, useRef } from 'react'
import Metadata from './entity/metadata';

interface SvgViewerProps {
  url: string;
  onMetadataLoaded?: (meta: Metadata) => void;
}

export const SvgViewer: React.FC<SvgViewerProps> = ({ url, onMetadataLoaded }) => {
  const callbackRef = useRef(onMetadataLoaded);
  callbackRef.current = onMetadataLoaded;

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        if (doc.querySelector('parsererror')) throw new Error('Invalid SVG');

        const metaText = doc.querySelector('metadata')?.textContent?.trim();

        let parsedMeta = {} as Metadata;
        if (metaText) {
          try { parsedMeta = JSON.parse(metaText); } catch { console.warn('Invalid metadata JSON'); }
        }

        callbackRef.current?.({...parsedMeta });
      })
      .catch((e) => {
        if (e.name !== 'AbortError') console.error(e);
      });

    return () => controller.abort();
  }, [url]);

  return <object id="svg-display" type="image/svg+xml" data={url}>SVG could not be displayed.</object>;
};