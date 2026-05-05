import Setting from '../../models/App_Restaurant/Setting.js';

// GET /api/settings — fetch the one-and-only settings document
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({});
    
    // If no settings, create them
    if (!settings) {
      settings = new Setting({});
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/settings — update the settings document
export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({});
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const saved = await settings.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
