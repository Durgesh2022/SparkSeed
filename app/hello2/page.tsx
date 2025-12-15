export default function Home() {
  return (
    <div className="absolute top-30 min-h-screen flex items-center justify-center p-8">
      <div className="w-full ">
        <video
          className="w-full h-[90vh] object-cover rounded-lg shadow-2xl"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(53, 94, 59, 0.3)'
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}