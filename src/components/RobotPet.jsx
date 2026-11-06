
export default function RobotPet({ nickname = "" }) {
  return (
    <div className="robot-pet-container">
      <div className="robot-speech">
        {nickname
          ? `Hi, ${nickname}! Ready for space?`
          : "Beep boop! Your adventure awaits!"}
      </div>

      <div className="robot-pet" role="img" aria-label="Cute friendly robotic pet">
        <div className="robot-antenna">
          <span></span>
        </div>

        <div className="robot-head">
          <div className="robot-ear left"></div>

          <div className="robot-face">
            <span className="robot-eye"></span>
            <span className="robot-eye"></span>
            <span className="robot-smile"></span>
          </div>

          <div className="robot-ear right"></div>
        </div>

        <div className="robot-body">
          <div className="robot-chest">★</div>
        </div>

        <div className="robot-arm left"></div>
        <div className="robot-arm right"></div>

        <div className="robot-feet">
          <span></span>
          <span></span>
        </div>
      </div>

      <p className="robot-name">ROBO-PAL</p>
    </div>
  );
}
