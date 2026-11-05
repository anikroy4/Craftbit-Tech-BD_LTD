import mongoose from 'mongoose';
import dns from 'dns';

// Ensure Node SRV resolution works across Windows local ISP DNS setups
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if permissions or platform prevent changing DNS servers
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MongoDB Error: MONGO_URI is not defined in environment variables (.env)');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: 'craftbit'
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

export default connectDB;

