import { useState } from "react";
import { Tooltip, LinearProgress } from "@mui/material";
import ProgressModal from "./ProgressModal";

const ProgressCell = ({ params, onUpdate }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={`${params.value}%`} arrow>
        <div
          onDoubleClick={() => setOpen(true)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <LinearProgress variant="determinate" value={params.value} sx={{ width: "100%" }} />
        </div>
      </Tooltip>

      {/* Progress Modal */}
      <ProgressModal
        open={open}
        onClose={() => setOpen(false)}
        bookId={params.id}
        currentProgress={params.value}
        onProgressUpdate={onUpdate} // Pass update function
      />
    </>
  );
};

export default ProgressCell;
