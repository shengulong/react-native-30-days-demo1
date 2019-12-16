let width = 800,
  height = 800,
  rotate = [10, -10],
  velocity = [0.003, -0.001],
  time = Date.now();

let projection = d3.geo
  .orthographic()
  // 球体的大小
  .scale(360)
  .translate([width / 2, height / 2])
  .clipAngle(90 + 1e-6)
  .precision(0.3);

let path = d3.geo.path().projection(projection);

let graticule = d3.geo.graticule();

let m0, o0;

let drag = d3.behavior
  .drag()
  .on('dragstart', function() {
    let proj = projection.rotate();
    m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
    o0 = [-proj[0], -proj[1]];
  })
  .on('drag', function() {
    let m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY],
      o1 = [o0[0] + (m1[0] - m0[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
    projection.rotate([o1[0], -o1[1]]);
    path = d3.geo.path().projection(projection);
    svg.selectAll('path').attr('d', path);
  });

let svg = d3
  .select('#sphere')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .call(drag);

svg
  .append('path')
  .datum({type: 'Sphere'})
  .attr('class', 'sphere')
  .attr('d', path);

svg
  .append('path')
  .datum(graticule)
  .attr('class', 'graticule')
  .attr('d', path);

svg
  .append('path')
  .datum({
    type: 'LineString',
    coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]],
  })
  .attr('class', 'equator')
  .attr('d', path);

// let feature = svg.selectAll("path");

// d3.timer(function() {
//   let dt = Date.now() - time;
//   projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
//   feature.attr("d", path);
// });
