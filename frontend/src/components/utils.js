/**
 * Responds to the mouse-in event on a map shape (state).
 *
 * @param {?google.maps.MapMouseEvent} e
 */

let censusMin = Number.MAX_VALUE,
  censusMax = -Number.MAX_VALUE;

export function mouseInToRegion(e, setState) {
  // set the hover state so the setStyle function can change the border
  e.feature.setProperty("state", "hover");

  const percent =
    ((e.feature.getProperty("census_variable") - censusMin) /
      (censusMax - censusMin)) *
    100;

  // update the label
  setState(e.feature.getProperty("NAME"));
  //   document.getElementById("data-value").textContent = e.feature
  //     .getProperty("census_variable")
  //     .toLocaleString();
  //   document.getElementById("data-box").style.display = "block";
  //   document.getElementById("data-caret").style.display = "block";
  //   document.getElementById("data-caret").style.paddingLeft = percent + "%";
}

/**
 * Responds to the mouse-out event on a map shape (state).
 *
 */
export function mouseOutOfRegion(e) {
  // reset the hover state, returning the border to normal
  e.feature.setProperty("state", "normal");
}

export function addMarker(map, location, title, image = null) {
  if (location?.lat && location?.lng)
    return new window.google.maps.Marker({
      position: location,
      map,
      title,
      draggable: true,
      icon: image,
    });
}

export const makeContentBox = ({ name, plantsNumber, pt = 0, genNet }) => {
  return `<div id="content">
          <div id="siteNotice">
          </div>
          <h1 id="firstHeading" class="firstHeading">${name}</h1>
          <div id="bodyContent">
          ${plantsNumber ? `<p> Number of plants : ${plantsNumber}</p>` : ""}
          ${pt ? `<p> Percentage of plants : ${pt} <p>` : ""}
          ${genNet ? `<p> annual net generation (MWh) : ${genNet} <p>` : ""}
          </div> 
          </div>`;
};
