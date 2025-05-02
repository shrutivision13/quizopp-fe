import { useEffect, useRef } from "react";

const adSlotCache = new Map(); // Maps slotId to slot reference

const AdSlot = ({ slotId, adUnitPath, sizes }) => {
  const retryCount = useRef(0);
  const maxRetries = 50;
  const retryInterval = 3000;

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    const googletag = window.googletag;
    window.googletag.cmd.push(() => {
      // Remove previously defined slot if any
      if (adSlotCache.has(slotId)) {
        const oldSlot = adSlotCache.get(slotId);
        googletag.destroySlots([oldSlot]);
        adSlotCache.delete(slotId);
      }

      // Define new slot
      const slot = googletag
        .defineSlot(adUnitPath, sizes, slotId)
        .addService(googletag.pubads());

      adSlotCache.set(slotId, slot);

      googletag.enableServices();

      googletag.pubads().addEventListener("slotRenderEnded", (event) => {
        if (
          event.slot === slot &&
          event.isEmpty &&
          retryCount.current < maxRetries
        ) {
          retryCount.current++;
          setTimeout(() => googletag.pubads().refresh([slot]), retryInterval);
        }
      });

      googletag.display(slotId);
    });

    // Optional cleanup on unmount
    return () => {
      window.googletag?.cmd.push(() => {
        if (adSlotCache.has(slotId)) {
          const slot = adSlotCache.get(slotId);
          googletag.destroySlots([slot]);
          adSlotCache.delete(slotId);
        }
      });
    };
  }, [slotId, adUnitPath, sizes]);

  return (
    <div className="mt-20">
      <div className="flex justify-center border-y border-y-C8789C3 py-8 bg-C0C0D26 displayad-wrapper">
        <div
          className="style-module_gam_container__9KUaZ"
        >
          <div className="ad-content">
            <div
              id={slotId}
              style={{ minWidth: sizes[0], minHeight: sizes[1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSlot;
