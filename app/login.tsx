    import { Link, useRouter } from 'expo-router';
    import { useState } from 'react';
    import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    } from 'react-native';

    import { useAuth } from '../src/providers/auth-provider';

    export default function LoginScreen() {
    const router = useRouter();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        setError(null);

        if (!email.trim()){
        setError('Ingresa tu correo electrónico');
        return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Ingresa un correo electrónico válido');
        return;
        }

        if (!password) {
        setError('Ingresa tu contraseña');
        return;
        }

        if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
        }

        setIsSubmitting(true);

        const message = await signIn(email.trim(), password);

        setIsSubmitting(false);

        if (message) {
        setError(message);
        return;
        }

        router.replace('/');
    };

    return (
        <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Bienvenidos a Mafers</Text>
            <Text style={styles.subtitle}>Iniciar sesión</Text>

            <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Correo electrónico"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            />

            <TextInput
            autoCapitalize="none"
            autoComplete="password"
            placeholder="Contraseña"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
            style={styles.button}
            onPress={handleLogin}
            disabled={isSubmitting}
            >
            {isSubmitting ? (
                <ActivityIndicator color="#de4dff" />
            ) : (
                <Text style={styles.buttonText}>Entrar</Text>
            )}
            </Pressable>

            <Link href="/signup" style={styles.link}>
            Crear una cuenta nueva
            </Link>
        </View>
        </View>
    );
    }

    /* =======================
    TUS STYLES (SIN CAMBIOS)
    ======================= */
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffabea',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: '#f0e2ec',
        borderRadius: 24,
        padding: 24,
        gap: 14,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#450056',
    },
    subtitle: {
        fontSize: 16,
        color: '#861aaa',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#94a3b8',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#0f172a',
        backgroundColor: '#f8fafc',
    },
    button: {
        minHeight: 50,
        borderRadius: 16,
        backgroundColor: '#fac0fb',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#6e027a',
    },
    error: {
        color: '#b91c1c',
        fontSize: 14,
    },
    link: {
        color: '#610220',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 6,
    },
    });