const elements = document.querySelectorAll('.move');

function getRandomDirection() {
  const randomAngle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(randomAngle),
    y: Math.sin(randomAngle)
  };
}

elements.forEach((element) => {
  const randomX = Math.random() * (window.innerWidth + 200) - 100;
  const randomY = Math.random() * (window.innerHeight + 200) - 100;
  const randomScale = Math.random() * 0.05 + 0.3; // Initial scale between 0.9 and 1.1

  element.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
  element.direction = getRandomDirection();

  // Add event listeners for hover
  element.addEventListener('mouseenter', () => {
    element.isPaused = true;
  });

  element.addEventListener('mouseleave', () => {
    element.isPaused = false;
  });
});

function moveElements() {
  elements.forEach((element) => {
    if (!element.isPaused) {
      const currentTransform = window.getComputedStyle(element).transform;
      const currentMatrix = new DOMMatrix(currentTransform);

      const distance = 100;

      const nextX = currentMatrix.e + distance * element.direction.x;
      const nextY = currentMatrix.f + distance * element.direction.y;

      // Ensure the next position stays within the extended boundaries
      const minX = -100;
      const minY = -100;
      const maxX = window.innerWidth + 100 - element.clientWidth;
      const maxY = window.innerHeight + 100 - element.clientHeight;

      const boundedX = Math.max(minX, Math.min(nextX, maxX));
      const boundedY = Math.max(minY, Math.min(nextY, maxY));

      // If the next position reaches the boundaries, change the direction randomly
      if (nextX !== boundedX || nextY !== boundedY) {
        element.direction = getRandomDirection();
      }

      // Randomly transform in scale
      const randomScaleChange = (Math.random() - 0.05) * 0.3; // Random scale change between -0.1 and 0.1
      const currentScale = parseFloat(window.getComputedStyle(element).transform.split(',')[3]);
      const nextScale = Math.max(0.5, Math.min(currentScale + randomScaleChange, 0.3));

      // Move in the current direction and apply the new scale
      element.style.transform = `translate(${boundedX}px, ${boundedY}px) scale(${nextScale})`;
    }
  });

  setTimeout(() => {
    requestAnimationFrame(moveElements);
  }, 2000); // Adjust the timeout to match the transition duration
}

moveElements();
