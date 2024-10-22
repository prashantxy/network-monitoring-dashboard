document.getElementById('sendPacket').addEventListener('click', () => {
    const sourceId = document.getElementById('source').value;
    const destinationId = document.getElementById('destination').value;
  
    if (sourceId === destinationId) {
      updateStatus('Source and destination cannot be the same!', 'red');
    } else {
      sendPacket(sourceId, destinationId);
    }
  });
  
  function sendPacket(sourceId, destinationId) {
    const packet = createPacket();
    const source = document.getElementById(sourceId);
    const destination = document.getElementById(destinationId);
    const router = document.getElementById('router');
  
    // Start the packet transmission from source to router, then to destination
    movePacket(packet, source, router, () => {
      router.classList.add('active'); // Indicate router is processing
  
      setTimeout(() => {
        movePacket(packet, router, destination, () => {
          router.classList.remove('active'); // Remove router activity indication
          updateStatus(`Packet successfully transmitted from ${sourceId} to ${destinationId}!`, 'green');
          packet.remove(); // Remove the packet after successful transmission
        });
      }, 1000); // Simulate processing delay at the router
    });
  }
  
  // Function to create a packet element
  function createPacket() {
    const packet = document.createElement('div');
    packet.classList.add('packet');
    document.body.appendChild(packet);
    return packet;
  }
  
  // Function to move the packet between devices using CSS transforms
  function movePacket(packet, source, target, callback) {
    const startX = source.offsetLeft + source.offsetWidth / 2 - 15;
    const startY = source.offsetTop + source.offsetHeight / 2 - 15;
    const targetX = target.offsetLeft + target.offsetWidth / 2 - 15;
    const targetY = target.offsetTop + target.offsetHeight / 2 - 15;
  
    packet.style.transform = `translate(${startX}px, ${startY}px)`;
  
    setTimeout(() => {
      packet.style.transform = `translate(${targetX}px, ${targetY}px)`;
      setTimeout(callback, 1000); // Wait for the transition to complete
    }, 100); // Small delay to start the animation
  }
  
  // Function to update the status message
  function updateStatus(message, color) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.color = color;
  }
  