(async function () {
    'use strict'

    // Create websocket
    const websocket = new WebSocket('ws://192.168.0.135/prod')
    let newVid = false
    let pass = ''

    websocket.onmessage = function (event) {
        // If a new video arrives
        if (newVid) {
            const videos = document.getElementById('videos')
            const container = document.createElement('div')
            container.innerHTML = '<h2>' + '<div id="newVid">NEW</div> ' + event.data.split('.mp4')[0].split(',')[1].replaceAll('_', ' ').replaceAll('.', ':') + '</h2>'
            container.id = 'videoCont'
            const video = document.createElement('video')
            video.src = 'http://192.168.0.135/prod/' + event.data
            video.setAttribute('controls','controls')
            video.width = 400

            container.appendChild(video)
            if(videos.firstChild) {
                videos.insertBefore(container, videos.firstChild)
            } else {
                videos.appendChild(container)
            }
            return
        } 
        let data = JSON.parse(event.data)
        
        // If password is incorrect
        if (data.error) {
                document.getElementById('error').innerHTML = 'Wrong password'
        // If password was correct and the server sent the names of the videos
        } else if(data.files) {
            newVid = true
            // Remove all elements on page
            if(document.getElementById('password')) {
                document.getElementById('password').remove()
                document.getElementById('submit').remove()
                document.getElementById('streamSubmit').remove()
                document.getElementById('sub').remove()
                document.getElementById('error').remove()
            }

            // Create button to go to stream
            let button = document.createElement('button')
            button.id = 'switch'
            document.body.appendChild(button)

            const videoNames = data.files
            const videos = document.getElementById('videos')
            videoNames.forEach((name) => {
                const container = document.createElement('div');
                container.id = 'videoCont'
                container.innerHTML = '<h2>' + name.split('.mp4')[0].split(',')[1].replaceAll('_', ' ').replaceAll('.', ':') + '</h2>'
                const video = document.createElement('video')
                video.src = 'http://192.168.0.135/prod/' + name
                video.setAttribute('controls','controls')
                video.width = 400

                container.appendChild(video)
                videos.appendChild(container)
            })

            // Click to switch to videos
            button.addEventListener('click', () => {
                document.element.getElementById('videos').remove()
                websocket.send(pass + " stream")
                button.remove()
            })
        // Password was correct and server responded with link to stream
        } else {
            // Remove all elements on page
            if(document.getElementById('password')) {
                document.getElementById('password').remove()
                document.getElementById('submit').remove()
                document.getElementById('streamSubmit').remove()
                document.getElementById('sub').remove()
                document.getElementById('error').remove()
            }

            // Create button to go to videos
            let button = document.createElement('button')
            button.id = 'switch'

            document.body.appendChild(button)
            document.body.innerHTML += "<img id='streamImg' src='" + data.src + "' width='640' height='480'></img>"

            // Click to switch to videos
            button.addEventListener('click', () => {
                document.element.getElementById('streamImg').remove()
                websocket.send(pass + " videos")
                button.remove()
            })
        }
    }

    // Get elements from document
    let submit = document.getElementById('submit')
    let streamSubmit = document.getElementById('streamSubmit')
    let password = document.getElementById('password')

    // Send password to server through socket
    submit.addEventListener('click', () => {
        if(password.value.length > 0) {
            pass = password.value
            websocket.send(password.value + " videos")
        }
    })

    streamSubmit.addEventListener('click', () => {
        if(password.value.length > 0) {
            pass = password.value
            websocket.send(password.value + " stream")
        }
    })
})()
