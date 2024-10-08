<script type="text/javascript">

    var iframe = document.getElementById( 'api-frame' );

        var uid = '731235038f6945d19f10d9331b78ea09';
        var client = null;

        function loadmodel() {
            document.addEventListener('load', () => console.log( 'viewerready' ));

            // By default, the latest version of the viewer API will be used.
            var client = new Sketchfab( iframe );

            // Alternatively, you can request a specific version.
            // var client = new Sketchfab( '1.12.0', iframe );

            client.init( uid, {
                success: function onSuccess( api ) {
                    console.log( 'Success' );
                    api.load();
                    api.start();

                    api.addEventListener( 'viewerready', function() {
                        console.log( 'Viewer is ready' );
                        // once the viewer is ready, show the iframe
                        let $apiFrame = document.getElementById( 'api-frame' );
                        $apiFrame.classList.remove( 'hidden' ); // Remove hidden class
                    } );
                },
                error: function onError( callback ) {
                    console.log( this.error );
                }
            } );
        }
  </script>