;(function($) {
     $.fn.rocket3d = function(options) {
         var defaults = {
             enterOn: 'now',
             delayTime: 5000,
         };
         var options = $.extend(defaults, options);

         return this.each(function() {
                              var _this = $(this);
                              var _started = false;

                              function init() {
                                  if (_started) {
                                      return ;
                                  }
                                  _started = true;
                                  var _width = $('body').width();
                                  var _height = Math.max($('body').height(), $(window).height());
                                  //$("html:not(:animated),body:not(:animated)").animate({scrollTop: _height - $(window).height()}, 500, function() { });

                                  /******/
                                  if (typeof(Detector) == 'undefined' || !Detector.webgl) {
                                      Detector.addGetWebGLMessage();
                                  }
			          var container, stats;
			          var camera, scene, renderer;
			          var mesh, mesh2, mesh3, light;
			          var mouseX = 0, mouseY = 0;
			          var windowHalfX = window.innerWidth / 2;
			          var windowHalfY = window.innerHeight / 2;
                                  $('body').append('<div id="rocket3dcontainer"></div>');
                                  container = $('#rocket3dcontainer');
                                  container.css({position: 'absolute', width: '100%', height: '100%', top: 0, left: 0});
				  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
				  camera.position.z = 1800;
				  scene = new THREE.Scene();
				  light = new THREE.DirectionalLight(0xffffff);
				  light.position.set(0, 0, 1).normalize();
				  scene.add(light);
				  var loader = new THREE.JSONLoader();
				  loader.load("obj/rocket3d.js", function (geometry) {
				                  geometry.materials[0].shading = THREE.FlatShading;
                                                  mesh = new THREE.Object3D();
				                  mesh.position.x = 0;
				                  mesh.scale.x = mesh.scale.y = mesh.scale.z = 150;
				                  scene.add( mesh );
				                  var part1 = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( {map:THREE.ImageUtils.loadTexture('tex/rocket3d_uvmap.png')} ) );
				                  mesh.add( part1 );
				                  //var part2 = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0.9, shading: THREE.FlatShading, wireframe: true, wireframeLinewidth: 2, transparent: true } ) );
				                  //mesh.add( part2 );
                                              });
				  renderer = new THREE.WebGLRenderer({antialias: true});
				  renderer.setSize(window.innerWidth, window.innerHeight);
                                  container.append(renderer.domElement);
                                  if (typeof(Stats) != 'undefined') {
				  stats = new Stats();
				      stats.domElement.style.position = 'absolute';
				      stats.domElement.style.top = '0px';
				      stats.domElement.style.right = '0px';
				      container.append(stats.domElement);
                                  }
				  document.addEventListener('mousemove', function(event) {
				                                mouseX = (event.clientX - windowHalfX);
				                                mouseY = (event.clientY - windowHalfY);
                                                            }, false);
			          animate();

			          function createScene2(geometry) {
				      geometry.materials[0].shading = THREE.FlatShading;
				      var material = new THREE.MeshFaceMaterial();
				      mesh2 = new THREE.Mesh(geometry, material);
				      mesh2.position.x = 0;
				      mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = 250;
				      scene.add(mesh2);
			          }


			          function animate() {
				      requestAnimationFrame(animate);
				      camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				      camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				      camera.lookAt( scene.position );
				      if (mesh) {
					  mesh.rotation.x += 0.01;
					  mesh.rotation.y += 0.01;
				      }
				      if (mesh2) {
					  mesh2.rotation.x += 0.01;
					  mesh2.rotation.y += 0.01;
				      }
				      renderer.render( scene, camera );
				      stats.update();
			          }
                              }

                              if (options.enterOn == 'now') {
                                  init();
                              } else if (options.enterOn == 'timer') {
                                  setTimeout(init, options.delayTime);
                              } else if(options.enterOn == 'click') {
                                  _this.bind('click', function(e) {
                                                 e.preventDefault();
                                                 init();
                                             });
                              } else if(options.enterOn == 'konami-code'){
                                  var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                                  $(window).bind("keydown.rocketz", function(e){
                                                     kkeys.push(e.keyCode);
                                                     if (kkeys.toString().indexOf(konami) >= 0) {
                                                         init();
                                                         kkeys = []
                                                     }
                                                 }, true);
                              }

                          });
     }
 })(jQuery);
