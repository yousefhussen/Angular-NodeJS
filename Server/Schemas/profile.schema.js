app.post('/auth/signup', (req, res) => {
    const { firstName, lastname, email, profilePic, } = req.body;
    // Store the data in the database here
  
    res.status(201).send({ message: 'User registered successfully' });
  });
  
  app.get('/auth/profile', (req, res) => {
    // Fetch the user's profile data from the database
    const userId = 1; // Assume user ID 1 for demonstration
    const user = users.find(u => u.id === userId);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
  