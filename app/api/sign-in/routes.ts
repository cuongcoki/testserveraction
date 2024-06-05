import { NextApiRequest, NextApiResponse } from 'next';

interface loginType {
    id: string,
    password: string
}

async function handlerLogin(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    if (method === 'POST') {
        try {
            // Extract login credentials from request body
            const { id, password } = req.body as loginType;

            // Validate credentials (implement your validation logic here)
            if (!id || !password) {
                return res.status(400).json({ message: 'Missing required credentials' });
            }

            // Securely store cookies (consider options like HttpOnly flag)
            const csrfToken = req.cookies.csrfToken; // Replace with your CSRF token handling mechanism

            // Prepare request options (avoid hardcoding sensitive information)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Consider adding 'X-CSRF-TOKEN': csrfToken header if applicable
                },
                body: JSON.stringify({ id, password }),
            };

            // Fetch data from authentication API
            const response = await fetch('http://157.66.219.5:7001/api/auth/login', requestOptions);

            if (!response.ok) {
                return res.status(response.status).json({ message: 'Login failed' });
            }

            const loginData = await response.json();
            res.status(200).json(loginData);
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function login(loginType: loginType) {
    try {
        const response = await fetch('http://157.66.219.5:7001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginType),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('dataresult', result);
        return result;
    } catch (error) {
        console.error('Error during sign in:', error);
    }
}



export { login, handlerLogin }