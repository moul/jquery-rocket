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
                                  /******/
                                  if (typeof(Detector) == 'undefined' || !Detector.webgl) {
                                      Detector.addGetWebGLMessage();
                                  }
			          var container, stats;
			          var camera, scene, renderer;
			          var mesh, mesh2, mesh3, light;
			          var mouseX = 0, mouseY = 0;
			          var windowHalfX = _width / 2;
			          var windowHalfY = _height / 2;
                                  $('body').append('<div id="rocket3dcontainer"></div>');
                                  container = $('#rocket3dcontainer');
                                  var _overflow_state = container.parent().css('overflow');
                                  container.css({position: 'absolute', width: _width, height: _height, top: 0, left: 0});
				  camera = new THREE.PerspectiveCamera(40, _width / _height, 1, 10000);
				  camera.position.z = 1800;
				  scene = new THREE.Scene();

                                  scene.fog = new THREE.FogExp2( 0xffffff, 0.0003 );
                                  //scene.fog.color.setHSV( 0.1, 0.5, 1 );
                                  scene.fog.color.setHSV( 0.1, 0.10, 1 );

				  light = new THREE.DirectionalLight(0xffffff);
				  light.position.set(0, 0, 1).normalize();
				  scene.add(light);
				  var loader = new THREE.JSONLoader();


				  loader.load("obj/rocket3d.js", function (geometry) {
				                  geometry.materials[0].shading = THREE.FlatShading;
                                                  mesh = new THREE.Object3D();
				                  //mesh.position.x = _width / 2;
                                                  mesh.position.x = _width / 2;
				                  mesh.position.y = -_height / 2 + 50;
				                  mesh.position.z = 0;
                                                  mesh.rotation.x = 0;
                                                  mesh.rotation.y = 0;
                                                  mesh.rotation.z = 0;
				                  mesh.scale.x = mesh.scale.y = mesh.scale.z = 100;
				                  scene.add( mesh );
				                  var part1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture('tex/rocket3d_uvmap.png')}));
				                  mesh.add(part1);
                                                  //var part2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xff0000, opacity: 0.9, shading: THREE.FlatShading, wireframe: true, wireframeLinewidth: 2, transparent: true }));
				                  //mesh.add(part2);
                                              });

				  renderer = new THREE.WebGLRenderer({antialias: true});
				  renderer.setSize(_width, _height);
                                  container.append(renderer.domElement);
                                  if (typeof(Stats) != 'undefined') {
				      stats = new Stats();
				      stats.domElement.style.position = 'absolute';
				      stats.domElement.style.top = '0px';
				      stats.domElement.style.right = '0px';
				      container.append(stats.domElement);
                                  } else {
                                      stats = false;
                                  }
				  /*document.addEventListener('mousemove', function(event) {
				                                mouseX = (event.clientX - windowHalfX);
				                                mouseY = (event.clientY - windowHalfY);
                                                            }, false);*/
                                  //container.parent().css('overflow', 'hidden');
                                  var step = 0;
                                  $("html:not(:animated),body:not(:animated)").animate({scrollTop: _height - $(window).height()}, 500, animate);
			          function animate() {
				      requestAnimationFrame(animate);

				      camera.position.x += (mouseX - camera.position.x ) * 1;
				      camera.position.y += (-mouseY - camera.position.y ) * 1;
				      camera.lookAt(scene.position);

                                      if (step == 0) {
					  //mesh.rotation.x += 0.00;
					  mesh.rotation.y += 0.02;
                                          mesh.position.x -= 7;
					  //mesh.rotation.z += 0.01;
                                          //mesh.scale.x += 0.1;
                                          //mesh.scale.y += 0.1;
                                          //mesh.scale.z += 0.1;
                                          if (mesh.position.x <= -_width / 2 + 200) {
                                              step = 1;
                                          }
				      } else if (step == 1) {
                                          mesh.rotation.y += 0.01;
                                          if (mesh.rotation.y >= 4.5) {
                                              step = 2;
                                          }
				      } else if (step == 2) {
                                          mesh.rotation.y += 0.01;
                                          mesh.rotation.x -= 0.01;
                                          if (mesh.rotation.x <= -0.3) {
                                              step = 3;
                                          }
                                      } else if (step == 3) {
                                          mesh.rotation.y += 0.01;
                                          mesh.rotation.z -= 0.01;
                                          if (mesh.rotation.z <= -0.4) {
                                              step = 4;
                                          }
                                      } else if (step == 4) {
                                          mesh.rotation.y += 0.01;
                                          //mesh.position.x += 0.01;
                                          //alert(mesh.rotation.y);
                                          //mesh.p
                                          if (mesh.rotation.y > 5.9) {
                                              step = 5;
                                          }
                                      } else if (step == 5) {
                                          mesh.rotation.y -= 0.01;
                                          if (mesh.rotation.y < 5.3) {
                                              step = 6;
                                          }
                                      } else if (step == 6) {
                                          step = 7;
                                      }

				      renderer.render(scene, camera);

                                      if (stats) {
				          stats.update();
                                      }
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
                              } else if(options.enterOn == 'konami-code') {
                                  var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                                  $(window).bind("keydown.rocketz", function(e) {
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
