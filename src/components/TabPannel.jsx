import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import PropTypes from 'prop-types';

export const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

export const a11yProps = index => ({
  id: `custom-tab-${index}`,
  "aria-controls": `custom-tabpanel-${index}`,
})
