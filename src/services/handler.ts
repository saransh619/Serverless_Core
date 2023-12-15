import { APIGatewayProxyHandler } from 'aws-lambda';
import { sequelize } from '../utils/sequelize';
import { initUser, User } from '../models/user';
import { initProduct } from '../models/product';

const initModels = () => {
  initUser(sequelize);
  initProduct(sequelize);
};

const runMigrations: APIGatewayProxyHandler = async (_event, _context) => {
  if (_event.httpMethod === 'POST') {
    try {
      initModels(); // Initialize all models
      await sequelize.sync(); // Run migrations for all initialized models
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Migrations executed successfully' }),
      };
    } catch (error) {
      console.error('Error running migrations:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error running migrations', error }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid HTTP method' }),
    };
  }
};

const undoMigrations: APIGatewayProxyHandler = async (_event, _context) => {
  if (_event.httpMethod === 'POST') {
    try {
      initModels(); // Initialize all models
      await sequelize.drop(); // Revert all migrations for all initialized models
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Migrations reverted successfully' }),
      };
    } catch (error) {
      console.error('Error reverting migrations:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error reverting migrations', error }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid HTTP method' }),
    };
  }
};

const hello: APIGatewayProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, world!' }),
  };
};

const getUser: APIGatewayProxyHandler = async (event, _context) => {
  try {
    initModels();
    const userIdStr = event.pathParameters?.id;
    if (userIdStr === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. User ID is missing.' }),
      };
    }

    const userId = parseInt(userIdStr, 10);

    if (isNaN(userId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. User ID is not a valid number.' }),
      };
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error getting user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error getting user', error }),
    };
  }
};

const createUser: APIGatewayProxyHandler = async (event, _context) => {
  try {
    initModels();
    const requestBody = event.body;

    if (requestBody === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. Request body is missing.' }),
      };
    }

    const body = JSON.parse(requestBody);
    const user = await User.create(body);

    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating user', error }),
    };
  }
};

const updateUser: APIGatewayProxyHandler = async (event, _context) => {
  try {
    initModels();
    const userIdStr = event.pathParameters?.id; // Use optional chaining
    if (userIdStr === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. User ID is missing.' }),
      };
    }

    const userId = parseInt(userIdStr, 10);

    if (isNaN(userId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. User ID is not a valid number.' }),
      };
    }
    const requestBody = event.body;

    if (requestBody === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. Request body is missing.' }),
      };
    }

    const body = JSON.parse(requestBody);

    const [updatedRowsCount] = await User.update(body, {
      where: { id: userId },
    });

    if (updatedRowsCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User updated successfully' }),
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating user', error }),
    };
  }
};

const deleteUser: APIGatewayProxyHandler = async (event, _context) => {
  try {
    initModels();

    const userIdStr = event.pathParameters?.id;
    if (userIdStr === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. User ID is missing.' }),
      };
    }

    const userId = parseInt(userIdStr, 10);

    if (isNaN(userId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. User ID is not a valid number.' }),
      };
    }
    const deletedRowsCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedRowsCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleted successfully' }),
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting user', error }),
    };
  }
};

export { runMigrations, undoMigrations, hello, createUser, deleteUser, updateUser, getUser };