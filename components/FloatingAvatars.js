export default function FloatingAvatars({ className }) {
  return (
    <div className={`floating-avatars ${className || ''}`} aria-hidden="true">
      <div className="avatar avatar-a">N</div>
      <div className="avatar avatar-b">P</div>
      <div className="avatar avatar-c"><img src="/images/gpay.svg" alt="" style={{ width: '30px', height: '30px' }} /></div>
    </div>
  );
}
