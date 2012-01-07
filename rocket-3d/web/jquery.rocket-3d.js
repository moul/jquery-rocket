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
                                  var windowRatio = _width / _height;
                                  $('body').append('<div id="rocket3dcontainer"></div>');
                                  container = $('#rocket3dcontainer');
                                  var _overflow_state = container.parent().css('overflow');
                                  container.css({position: 'absolute', width: _width, height: _height, top: 0, left: 0});
				  camera = new THREE.PerspectiveCamera(40, _width / _height, 1, 10000);
				  camera.position.z = 4000;
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
                                  //alert(_width + ' / ' + _height);
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
                                  var sleep_counter = 0;
                                  $('#aawidth').html(_width);
                                  $('#aaheight').html(_height);
				  $('#aacamera').html(camera.position.z);
                                  $("html:not(:animated),body:not(:animated)").animate({scrollTop: _height - $(window).height()}, 500, animate);
			          function animate() {
				      requestAnimationFrame(animate);

				      camera.position.x += (mouseX - camera.position.x ) * 1;
				      camera.position.y += (-mouseY - camera.position.y ) * 1;
				      camera.lookAt(scene.position);

                                      $('#aastep').html(step);
                                      $('#aasleep_counter').html(sleep_counter);
                                      $('#rotationx').html(mesh.rotation.x);
                                      $('#rotationy').html(mesh.rotation.y);
                                      $('#rotationz').html(mesh.rotation.z);
                                      $('#positionx').html(mesh.position.x);
                                      $('#positiony').html(mesh.position.y);
                                      $('#positionz').html(mesh.position.z);

                                      if (step == 0) {
					  mesh.rotation.y += 0.1;
                                          mesh.position.x -= 14;
                                          if (mesh.position.x <= -_width / 2 + 200) {
                                              mesh.rotation.y = Math.round(mesh.rotation.y * 10) / 10;
                                              mesh.position.x = Math.round(mesh.position.x * 10) / 10;
                                              step = 1;
                                              sleep_counter = 0;
                                          }
				      } else if (step == 1) {
					  mesh.rotation.y += 0.1;
                                          if (mesh.rotation.y % 6 < 0.2) {
                                              mesh.rotation.y = Math.round(mesh.rotation.y * 10) / 10;
                                              step = 2;
                                          }
				      } else if (step == 2) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 40) {
                                              step = 3;
                                          }
				      } else if (step == 3) {
                                          mesh.position.x += 2;
                                          if (mesh.position.x >= -_width / 2 + 300) {
                                              sleep_counter = 0;
                                              step = 5;
                                          }
				      } else if (step == 5) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 20) {
                                              step = 10;
                                          }
				      } else if (step == 10) {
                                          mesh.rotation.y += 0.01;
                                          if (mesh.rotation.y >= 4.5) {
                                              sleep_counter = 0;
                                              step = 15;
                                          }
				      } else if (step == 15) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 20) {
                                              step = 20;
                                          }
				      } else if (step == 20) {
                                          mesh.rotation.y += 0.01;
                                          mesh.rotation.x -= 0.02;
                                          if (mesh.rotation.x <= -0.3) {
                                              sleep_counter = 0;
                                              step = 30;
                                          }
				      } else if (step == 25) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 10) {
                                              step = 30;
                                          }
                                      } else if (step == 30) {
                                          mesh.rotation.y += 0.01;
                                          mesh.rotation.z -= 0.01;
                                          if (mesh.rotation.z <= -0.4) {
                                              sleep_counter = 0;
                                              step = 35;
                                          }
				      } else if (step == 35) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 10) {
                                              step = 40;
                                          }
                                      } else if (step == 40) {
                                          mesh.rotation.y += 0.01;
                                          //mesh.position.x += 0.01;
                                          //alert(mesh.rotation.y);
                                          //mesh.p
                                          if (mesh.rotation.y > 5.5) {
                                              sleep_counter = 0;
                                              step = 45;
                                          }
				      } else if (step == 45) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 10) {
                                              step = 50;
                                          }
                                      } else if (step == 50) {
                                          mesh.rotation.y -= 0.03;
                                          //console.log(mesh.rotation.y % 6);
                                          if (mesh.rotation.y % 6 > 4.6 && mesh.rotation.y % 6 < 4.8) {
                                              step = 55;
                                              sleep_counter = 0;
                                          }
				      } else if (step == 55) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 10) {
                                              step = 60;
                                          }
                                      } else if (step == 60) {
                                          mesh.rotation.y += 0.01;
                                          if (mesh.rotation.y % 6 > 5.3 && mesh.rotation.y % 6 < 5.5) {
                                              step = 65;
                                              sleep_counter = 0;
                                          }
				      } else if (step == 65) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 10) {
                                              step = 70;
                                          }
                                      } else if (step == 70) {
                                          mesh.rotation.x -= 0.01;
                                          if (mesh.rotation.x % 6 + 6 > 5 && mesh.rotation.x % 6 + 6 < 5.2) {
                                              step = 75;
                                              sleep_counter = 0;
                                          }
				      } else if (step == 75) {
                                          sleep_counter += 1;
                                          if (sleep_counter > 50) {
                                              step = 80;
                                          }
                                      } else if (step == 80) {
                                          mesh.position.y += 5;
                                          mesh.position.x += 5 * windowRatio;
                                          mesh.scale.x -= 0.2;
                                          mesh.scale.y -= 0.2;
                                          mesh.scale.z -= 0.2;
                                          if (mesh.position.x > _width) {
                                              step = 100;
                                          }
                                      }

				      renderer.render(scene, camera);

                                      if (stats && false) {
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
