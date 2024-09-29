const os = require('os');


export default function getLocalIp() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      // Check if the interface is an IPv4 address and is not a loopback address
      if (iface.family === 'IPv4' && !iface.internal) {
        return "http://${iface.address}:"; // Return the first found local IP address
      }
      else {
        return "localhost:3000";
      }
    }
  }
  return null; // Return null if no local IP address is found
}


